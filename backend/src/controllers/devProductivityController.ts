import { Request, Response } from 'express';
import GitHubMetricsService from '../services/githubMetricsService';

/**
 * Get developer productivity metrics
 * Returns PR merge statistics, daily/weekly breakdowns, and streak information
 */
export const getDevProductivity = async (req: Request, res: Response) => {
  try {
    const metrics = await GitHubMetricsService.getProductivityMetrics();
    res.json(metrics);
  } catch (error: unknown) {
    console.error('Error fetching dev productivity metrics:', error);

    if (error instanceof Error && error.message.includes('GITHUB_TOKEN')) {
      res.status(503).json({
        error: 'GitHub integration not configured',
        message: 'GITHUB_TOKEN environment variable is not set',
      });
      return;
    }

    res.status(500).json({
      error: 'Failed to fetch productivity metrics',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
