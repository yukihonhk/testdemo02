export interface KnowledgeArticle {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export interface Ticket {
  id: number;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
}

export interface QAMessage {
  id?: number;
  question: string;
  answer: string;
  timestamp: string;
}

export interface User {
  name: string;
  email: string;
}
