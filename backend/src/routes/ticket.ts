import { Router, Request, Response } from 'express';
import { validateToken } from '../middleware/auth';
import { ZendeskService } from '../services/zendesk';

const router = Router();
const zendeskService = new ZendeskService();

// Create a new ticket
router.post('/create', validateToken, async (req: Request, res: Response) => {
  try {
    const { subject, description, priority } = req.body;

    if (!subject || !description) {
      res.status(400).json({ error: 'Subject and description are required' });
      return;
    }

    const ticket = await zendeskService.createTicket({
      subject,
      description,
      priority: priority || 'normal',
    });

    res.json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// Get ticket by ID
router.get('/:id', validateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = await zendeskService.getTicket(id);

    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ error: 'Ticket not found' });
    }
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
});

// Get all tickets for user
router.get('/', validateToken, async (req: Request, res: Response) => {
  try {
    const tickets = await zendeskService.getUserTickets();
    res.json({ tickets });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

export default router;
