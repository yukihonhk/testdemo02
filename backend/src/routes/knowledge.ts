import { Router, Request, Response } from 'express';
import { validateToken } from '../middleware/auth';

const router = Router();

// Mock knowledge base data
const knowledgeBase = [
  {
    id: 1,
    title: 'How to reset your password',
    content: 'To reset your password, go to the login page and click "Forgot Password". Follow the instructions sent to your email.',
    category: 'Account',
    tags: ['password', 'reset', 'account'],
  },
  {
    id: 2,
    title: 'VPN Connection Issues',
    content: 'If you cannot connect to VPN, ensure you have the latest VPN client installed and your credentials are correct. Try restarting the VPN service.',
    category: 'Network',
    tags: ['vpn', 'connection', 'network'],
  },
  {
    id: 3,
    title: 'Software Installation Request',
    content: 'To request new software installation, create a ticket with the software name and business justification. The IT team will review and approve.',
    category: 'Software',
    tags: ['software', 'installation', 'request'],
  },
  {
    id: 4,
    title: 'Email Setup on Mobile',
    content: 'To set up your work email on mobile, use the Outlook app. Download it from app store, enter your work email, and authenticate with your credentials.',
    category: 'Email',
    tags: ['email', 'mobile', 'outlook'],
  },
  {
    id: 5,
    title: 'Printer Connection Issues',
    content: 'If you cannot connect to a printer, ensure you are on the corporate network. Go to Settings > Devices > Printers and add the network printer.',
    category: 'Hardware',
    tags: ['printer', 'hardware', 'connection'],
  },
];

// Search knowledge base
router.get('/search', validateToken, async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      res.json({ results: knowledgeBase });
      return;
    }

    const query = q.toLowerCase();
    const results = knowledgeBase.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query))
    );

    res.json({ results, query: q });
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// Get article by ID
router.get('/:id', validateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const article = knowledgeBase.find((a) => a.id === parseInt(id));

    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Get all articles
router.get('/', validateToken, async (req: Request, res: Response) => {
  try {
    res.json({ articles: knowledgeBase });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

export default router;
