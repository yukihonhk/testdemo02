import { Router, Request, Response } from 'express';
import { validateToken } from '../middleware/auth';

const router = Router();

// Mock Q&A responses
const qaResponses: { [key: string]: string } = {
  'how do i reset my password': 'To reset your password, visit the login page and click "Forgot Password". You will receive an email with instructions.',
  'vpn not working': 'Please check if you have the latest VPN client installed. If the issue persists, try restarting your computer and reconnecting.',
  'how to request software': 'To request new software, please create a ticket through our helpdesk system with the software name and business justification.',
  'email issues': 'For email issues, please try restarting your email client. If the problem continues, create a support ticket with details.',
  'printer not working': 'Ensure you are connected to the corporate network. Try removing and re-adding the printer from your device settings.',
};

// Get Q&A response
router.post('/ask', validateToken, async (req: Request, res: Response) => {
  try {
    const { question } = req.body;

    if (!question) {
      res.status(400).json({ error: 'Question is required' });
      return;
    }

    const lowerQuestion = question.toLowerCase();
    let answer = 'I\'m sorry, I don\'t have a specific answer for that question. Please search our knowledge base or create a support ticket for personalized assistance.';

    // Find matching response
    for (const [key, value] of Object.entries(qaResponses)) {
      if (lowerQuestion.includes(key) || key.includes(lowerQuestion)) {
        answer = value;
        break;
      }
    }

    res.json({
      question,
      answer,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process question' });
  }
});

// Get conversation history (mock)
router.get('/history', validateToken, async (req: Request, res: Response) => {
  try {
    const mockHistory = [
      {
        id: 1,
        question: 'How do I reset my password?',
        answer: 'To reset your password, visit the login page and click "Forgot Password".',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 2,
        question: 'VPN not working',
        answer: 'Please check if you have the latest VPN client installed.',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
    ];

    res.json({ history: mockHistory });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

export default router;
