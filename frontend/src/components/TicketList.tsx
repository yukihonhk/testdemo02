import React, { useState, useEffect } from 'react';
import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
} from '@mui/material';
import { ticketService } from '../services/api';
import { Ticket } from '../types';

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await ticketService.getAll();
      setTickets(data.tickets || []);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
      case 'new':
        return 'primary';
      case 'pending':
        return 'warning';
      case 'resolved':
      case 'closed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return 'error';
      case 'high':
        return 'warning';
      case 'normal':
        return 'info';
      case 'low':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        My Tickets
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        View and track your support tickets
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3}>
          {tickets.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No tickets found. Create a ticket if you need help!
              </Typography>
            </Box>
          ) : (
            <List>
              {tickets.map((ticket) => (
                <ListItem key={ticket.id} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="subtitle1">{ticket.subject}</Typography>
                        <Chip
                          label={ticket.status}
                          size="small"
                          color={getStatusColor(ticket.status)}
                        />
                        <Chip
                          label={ticket.priority}
                          size="small"
                          color={getPriorityColor(ticket.priority)}
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {ticket.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Ticket #{ticket.id} • Created:{' '}
                          {new Date(ticket.createdAt).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default TicketList;
