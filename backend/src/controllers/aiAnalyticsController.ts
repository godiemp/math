import { Request, Response } from 'express';
import { pool } from '../config/database';
import { success, error, errorResponses, getErrorMessage } from '../lib/response-helpers';
import {
  normalizePagination,
  paginate,
  getPaginationFromQuery
} from '../lib/pagination';

/**
 * AI Analytics Controller
 * Provides insights into AI tutor usage and effectiveness
 */

export const getAIAnalyticsDashboard = async (req: Request, res: Response) => {
  try {
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);

    // Run all queries in parallel for better performance
    const [
      overviewResult,
      interactionsByTypeResult,
      topQuestionsResult,
      userEngagementResult,
      performanceResult,
      recentInteractionsResult,
      conversationLengthResult,
      timeSeriesResult
    ] = await Promise.all([
      // Overview stats
      pool.query(`
        SELECT
          COUNT(*) as total_interactions,
          COUNT(DISTINCT user_id) as unique_users,
          COUNT(CASE WHEN created_at >= $1 THEN 1 END) as interactions_last_24h,
          COUNT(CASE WHEN created_at >= $2 THEN 1 END) as interactions_last_7d,
          AVG(response_time_ms)::int as avg_response_time_ms,
          MAX(response_time_ms) as max_response_time_ms
        FROM ai_interactions
      `, [oneDayAgo, sevenDaysAgo]),

      // Interactions by type
      pool.query(`
        SELECT
          interaction_type,
          COUNT(*) as count,
          COUNT(DISTINCT user_id) as unique_users,
          AVG(response_time_ms)::int as avg_response_time_ms
        FROM ai_interactions
        WHERE created_at >= $1
        GROUP BY interaction_type
        ORDER BY count DESC
      `, [sevenDaysAgo]),

      // Top questions triggering AI help (questions students struggle with most)
      pool.query(`
        SELECT
          question_id,
          COUNT(*) as interaction_count,
          COUNT(DISTINCT user_id) as unique_users,
          (request_context->>'question')::text as question_preview,
          (request_context->>'topic')::text as topic,
          (request_context->>'difficulty')::text as difficulty
        FROM ai_interactions
        WHERE question_id IS NOT NULL
          AND created_at >= $1
        GROUP BY question_id, request_context
        ORDER BY interaction_count DESC
        LIMIT 10
      `, [sevenDaysAgo]),

      // User engagement - users with most AI interactions
      pool.query(`
        SELECT
          user_id,
          COUNT(*) as interaction_count,
          COUNT(CASE WHEN interaction_type = 'chat' THEN 1 END) as chat_count,
          COUNT(CASE WHEN interaction_type = 'help' THEN 1 END) as help_count,
          MAX(created_at) as last_interaction
        FROM ai_interactions
        WHERE created_at >= $1
        GROUP BY user_id
        ORDER BY interaction_count DESC
        LIMIT 20
      `, [sevenDaysAgo]),

      // Performance metrics
      pool.query(`
        SELECT
          DATE_TRUNC('hour', TO_TIMESTAMP(created_at / 1000)) as hour,
          AVG(response_time_ms)::int as avg_response_time,
          MAX(response_time_ms) as max_response_time,
          COUNT(*) as request_count
        FROM ai_interactions
        WHERE created_at >= $1
        GROUP BY hour
        ORDER BY hour DESC
        LIMIT 24
      `, [oneDayAgo]),

      // Recent interactions sample
      pool.query(`
        SELECT
          id,
          user_id,
          question_id,
          interaction_type,
          LEFT(user_message, 100) as user_message_preview,
          LEFT(ai_response, 100) as ai_response_preview,
          turn_number,
          response_time_ms,
          created_at
        FROM ai_interactions
        ORDER BY created_at DESC
        LIMIT 50
      `),

      // Average conversation length (turns per chat session)
      pool.query(`
        SELECT
          quiz_session_id,
          COUNT(*) as turns,
          MIN(created_at) as session_start,
          MAX(created_at) as session_end
        FROM ai_interactions
        WHERE interaction_type = 'chat'
          AND quiz_session_id IS NOT NULL
          AND created_at >= $1
        GROUP BY quiz_session_id
        HAVING COUNT(*) > 1
        ORDER BY turns DESC
        LIMIT 20
      `, [sevenDaysAgo]),

      // Time series data for charts (daily interactions)
      pool.query(`
        SELECT
          DATE_TRUNC('day', TO_TIMESTAMP(created_at / 1000)) as date,
          COUNT(*) as total_interactions,
          COUNT(DISTINCT user_id) as unique_users,
          COUNT(CASE WHEN interaction_type = 'chat' THEN 1 END) as chat_count,
          COUNT(CASE WHEN interaction_type = 'help' THEN 1 END) as help_count,
          AVG(response_time_ms)::int as avg_response_time
        FROM ai_interactions
        WHERE created_at >= $1
        GROUP BY date
        ORDER BY date DESC
      `, [thirtyDaysAgo])
    ]);

    // Format response
    const analytics = {
      overview: overviewResult.rows[0] || {},
      interactionsByType: interactionsByTypeResult.rows,
      topQuestions: topQuestionsResult.rows.map(row => ({
        questionId: row.question_id,
        interactionCount: parseInt(row.interaction_count),
        uniqueUsers: parseInt(row.unique_users),
        questionPreview: row.question_preview?.substring(0, 100) || 'N/A',
        topic: row.topic || 'Unknown',
        difficulty: row.difficulty || 'Unknown'
      })),
      userEngagement: userEngagementResult.rows.map(row => ({
        userId: row.user_id,
        interactionCount: parseInt(row.interaction_count),
        chatCount: parseInt(row.chat_count),
        helpCount: parseInt(row.help_count),
        lastInteraction: row.last_interaction
      })),
      performance: performanceResult.rows,
      recentInteractions: recentInteractionsResult.rows.map(row => ({
        id: row.id,
        userId: row.user_id,
        questionId: row.question_id,
        interactionType: row.interaction_type,
        userMessagePreview: row.user_message_preview,
        aiResponsePreview: row.ai_response_preview,
        turnNumber: row.turn_number,
        responseTimeMs: row.response_time_ms,
        createdAt: row.created_at
      })),
      conversationStats: {
        averageTurns: conversationLengthResult.rows.length > 0
          ? (conversationLengthResult.rows.reduce((sum: number, row: any) => sum + parseInt(row.turns), 0) / conversationLengthResult.rows.length).toFixed(2)
          : 0,
        longestConversations: conversationLengthResult.rows.map((row: any) => ({
          sessionId: row.quiz_session_id,
          turns: parseInt(row.turns),
          duration: parseInt(row.session_end) - parseInt(row.session_start)
        }))
      },
      timeSeries: timeSeriesResult.rows
    };

    res.json(success(analytics));
  } catch (err) {
    console.error('[getAIAnalyticsDashboard] Error:', err);
    res.status(500).json(error('Failed to fetch AI analytics', getErrorMessage(err)));
  }
};

/**
 * Get detailed conversation history for a specific quiz session
 */
export const getConversationDetails = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const result = await pool.query(`
      SELECT
        id,
        user_id,
        question_id,
        interaction_type,
        user_message,
        ai_response,
        turn_number,
        response_time_ms,
        request_context,
        created_at
      FROM ai_interactions
      WHERE quiz_session_id = $1
      ORDER BY created_at ASC
    `, [sessionId]);

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponses.notFound('Conversation'));
    }

    res.json(success({
      sessionId,
      interactions: result.rows
    }));
  } catch (err) {
    console.error('[getConversationDetails] Error:', err);
    res.status(500).json(error('Failed to fetch conversation details', getErrorMessage(err)));
  }
};

/**
 * Get all conversations (list of all quiz sessions with AI interactions)
 */
export const getAllConversations = async (req: Request, res: Response) => {
  try {
    // Extract and normalize pagination params
    const { page, limit, offset } = normalizePagination(getPaginationFromQuery(req.query));

    // Get total count for pagination metadata
    const countResult = await pool.query(`
      SELECT COUNT(DISTINCT quiz_session_id) as total
      FROM ai_interactions
      WHERE quiz_session_id IS NOT NULL
    `);
    const total = parseInt(countResult.rows[0].total);

    // Get paginated data
    const result = await pool.query(`
      SELECT
        quiz_session_id,
        user_id,
        COUNT(*) as message_count,
        MIN(created_at) as started_at,
        MAX(created_at) as last_message_at,
        MAX(created_at) - MIN(created_at) as duration_ms,
        array_agg(DISTINCT interaction_type) as interaction_types
      FROM ai_interactions
      WHERE quiz_session_id IS NOT NULL
      GROUP BY quiz_session_id, user_id
      ORDER BY last_message_at DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    const conversations = result.rows.map(row => ({
      sessionId: row.quiz_session_id,
      userId: row.user_id,
      messageCount: parseInt(row.message_count),
      startedAt: row.started_at,
      lastMessageAt: row.last_message_at,
      durationMs: parseInt(row.duration_ms),
      interactionTypes: row.interaction_types
    }));

    // Create paginated response
    const paginatedResponse = paginate(conversations, total, { page, limit, offset });

    res.json(success(paginatedResponse));
  } catch (err) {
    console.error('[getAllConversations] Error:', err);
    res.status(500).json(error('Failed to fetch conversations', getErrorMessage(err)));
  }
};

/**
 * Get common student questions and patterns
 */
export const getCommonQuestions = async (req: Request, res: Response) => {
  try {
    const { limit = 20 } = req.query;

    // Find most common user messages/questions
    const result = await pool.query(`
      SELECT
        user_message,
        COUNT(*) as frequency,
        COUNT(DISTINCT user_id) as unique_users,
        AVG(response_time_ms)::int as avg_response_time,
        array_agg(DISTINCT (request_context->>'topic')::text) FILTER (WHERE request_context->>'topic' IS NOT NULL) as topics
      FROM ai_interactions
      WHERE interaction_type = 'chat'
        AND user_message IS NOT NULL
        AND user_message != 'Incorrect answer - automatic AI help requested'
      GROUP BY user_message
      HAVING COUNT(*) > 1
      ORDER BY frequency DESC
      LIMIT $1
    `, [limit]);

    res.json(success({
      commonQuestions: result.rows.map(row => ({
        question: row.user_message,
        frequency: parseInt(row.frequency),
        uniqueUsers: parseInt(row.unique_users),
        avgResponseTime: row.avg_response_time,
        topics: row.topics || []
      }))
    }));
  } catch (err) {
    console.error('[getCommonQuestions] Error:', err);
    res.status(500).json(error('Failed to fetch common questions', getErrorMessage(err)));
  }
};
