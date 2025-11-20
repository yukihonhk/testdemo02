import axios from 'axios';
import { API_BASE_URL } from '../config/authConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const knowledgeService = {
  search: async (query: string) => {
    const response = await api.get(`/knowledge/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
  getArticle: async (id: number) => {
    const response = await api.get(`/knowledge/${id}`);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/knowledge');
    return response.data;
  },
};

export const qaService = {
  ask: async (question: string) => {
    const response = await api.post('/qa/ask', { question });
    return response.data;
  },
  getHistory: async () => {
    const response = await api.get('/qa/history');
    return response.data;
  },
};

export const ticketService = {
  create: async (subject: string, description: string, priority: string) => {
    const response = await api.post('/tickets/create', { subject, description, priority });
    return response.data;
  },
  getTicket: async (id: number) => {
    const response = await api.get(`/tickets/${id}`);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/tickets');
    return response.data;
  },
};

export default api;
