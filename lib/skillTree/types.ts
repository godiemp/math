export interface SkillTreeNode {
  id: string;
  name: string;
  description: string;
  prerequisiteIds: string[];
  verificationPrompt: string;
}

export type SkillStatus = 'locked' | 'unlocked' | 'verified';

export interface SkillProgress {
  skillId: string;
  verifiedAt: number | null;
  conversationHistory: ChatMessage[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface VerifySkillRequest {
  skillId: string;
  userMessage: string;
  conversationHistory?: ChatMessage[];
}

export interface VerifySkillResponse {
  message: string;
  isVerified: boolean;
  conversationHistory: ChatMessage[];
}
