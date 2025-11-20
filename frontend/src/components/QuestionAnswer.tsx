import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { qaService } from '../services/api';
import { QAMessage } from '../types';

const QuestionAnswer: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<QAMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await qaService.getHistory();
      setMessages(data.history || []);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const response = await qaService.ask(question);
      const newMessage: QAMessage = {
        question: response.question,
        answer: response.answer,
        timestamp: response.timestamp,
      };
      setMessages([newMessage, ...messages]);
      setQuestion('');
    } catch (error) {
      console.error('Error asking question:', error);
      // Add error message
      const errorMessage: QAMessage = {
        question,
        answer: 'Sorry, there was an error processing your question. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages([errorMessage, ...messages]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Ask a Question
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Get instant answers to common IT questions
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Your Question"
            variant="outlined"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., How do I reset my password?"
            disabled={loading}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
            disabled={loading || !question.trim()}
          >
            Ask
          </Button>
        </form>
      </Paper>

      {messages.length > 0 && (
        <Paper elevation={3}>
          <List>
            {messages.map((msg, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" color="primary">
                        Q: {msg.question}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{ display: 'block', mt: 1 }}
                        >
                          A: {msg.answer}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(msg.timestamp).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < messages.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default QuestionAnswer;
