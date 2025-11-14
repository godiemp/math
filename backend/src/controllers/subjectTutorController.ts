import { Response } from 'express';
import { subjectTutorChat } from '../services/subjectTutorService';
import { AuthRequest } from '../types';

export const chatWithSubjectTutor = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { subject, topic, level, goal, language, messages = [], userMessage } = req.body;

    if (!subject || !topic) {
      res.status(400).json({ error: 'Subject and topic are required' });
      return;
    }

    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
      res.status(400).json({ error: 'User message is required' });
      return;
    }

    const result = await subjectTutorChat({
      subject,
      topic,
      level,
      goal,
      language,
      messages,
      userMessage,
    });

    res.json(result);
  } catch (error) {
    console.error('Error in subject tutor chat:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'No se pudo obtener la respuesta del tutor',
    });
  }
};
