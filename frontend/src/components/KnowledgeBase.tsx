import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { knowledgeService } from '../services/api';
import { KnowledgeArticle } from '../types';

const KnowledgeBase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const data = await knowledgeService.getAll();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error loading articles:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const data = await knowledgeService.search(searchQuery);
      setArticles(data.results || []);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleArticleClick = (article: KnowledgeArticle) => {
    setSelectedArticle(article);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Knowledge Base
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Search our knowledge base for helpful articles and guides
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            label="Search Knowledge Base"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="e.g., password, VPN, email"
          />
          <Button variant="contained" onClick={handleSearch} startIcon={<SearchIcon />}>
            Search
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3}>
        <List>
          {articles.map((article) => (
            <ListItem key={article.id} disablePadding>
              <ListItemButton onClick={() => handleArticleClick(article)}>
                <ListItemText
                  primary={article.title}
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Chip label={article.category} size="small" sx={{ mr: 1 }} />
                      {article.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ mr: 0.5 }} />
                      ))}
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedArticle && (
          <>
            <DialogTitle>{selectedArticle.title}</DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Chip label={selectedArticle.category} size="small" color="primary" sx={{ mr: 1 }} />
                {selectedArticle.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ mr: 0.5 }} />
                ))}
              </Box>
              <Typography variant="body1">{selectedArticle.content}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default KnowledgeBase;
