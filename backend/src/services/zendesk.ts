import { zendeskConfig } from '../config/config';

interface TicketData {
  subject: string;
  description: string;
  priority: string;
}

interface Ticket {
  id: number;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
}

export class ZendeskService {
  private client: any;
  private mockMode: boolean;

  constructor() {
    // Check if Zendesk is configured
    this.mockMode = !zendeskConfig.subdomain || !zendeskConfig.email || !zendeskConfig.token;

    if (!this.mockMode) {
      // Initialize Zendesk client when credentials are available
      try {
        const zendesk = require('node-zendesk');
        this.client = zendesk.createClient({
          username: zendeskConfig.email,
          token: zendeskConfig.token,
          remoteUri: `https://${zendeskConfig.subdomain}.zendesk.com/api/v2`,
        });
      } catch (error) {
        console.warn('Zendesk client initialization failed, using mock mode');
        this.mockMode = true;
      }
    }
  }

  async createTicket(data: TicketData): Promise<Ticket> {
    if (this.mockMode) {
      // Return mock ticket
      return {
        id: Math.floor(Math.random() * 10000),
        subject: data.subject,
        description: data.description,
        status: 'new',
        priority: data.priority,
        createdAt: new Date().toISOString(),
      };
    }

    return new Promise((resolve, reject) => {
      this.client.tickets.create(
        {
          ticket: {
            subject: data.subject,
            comment: { body: data.description },
            priority: data.priority,
          },
        },
        (err: any, req: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              id: result.id,
              subject: result.subject,
              description: data.description,
              status: result.status,
              priority: result.priority,
              createdAt: result.created_at,
            });
          }
        }
      );
    });
  }

  async getTicket(id: string): Promise<Ticket | null> {
    if (this.mockMode) {
      // Return mock ticket
      return {
        id: parseInt(id),
        subject: 'Sample Ticket',
        description: 'This is a sample ticket description',
        status: 'open',
        priority: 'normal',
        createdAt: new Date().toISOString(),
      };
    }

    return new Promise((resolve, reject) => {
      this.client.tickets.show(id, (err: any, req: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: result.id,
            subject: result.subject,
            description: result.description,
            status: result.status,
            priority: result.priority,
            createdAt: result.created_at,
          });
        }
      });
    });
  }

  async getUserTickets(): Promise<Ticket[]> {
    if (this.mockMode) {
      // Return mock tickets
      return [
        {
          id: 1001,
          subject: 'Password Reset Request',
          description: 'Need help resetting my password',
          status: 'open',
          priority: 'high',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 1002,
          subject: 'VPN Connection Issue',
          description: 'Cannot connect to VPN',
          status: 'pending',
          priority: 'normal',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ];
    }

    return new Promise((resolve, reject) => {
      this.client.tickets.list((err: any, req: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          const tickets = result.map((ticket: any) => ({
            id: ticket.id,
            subject: ticket.subject,
            description: ticket.description,
            status: ticket.status,
            priority: ticket.priority,
            createdAt: ticket.created_at,
          }));
          resolve(tickets);
        }
      });
    });
  }
}
