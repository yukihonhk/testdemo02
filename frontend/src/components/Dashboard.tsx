import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Tab,
  Tabs,
} from '@mui/material';
import { useMsal } from '@azure/msal-react';
import QuestionAnswer from './QuestionAnswer';
import KnowledgeBase from './KnowledgeBase';
import TicketForm from './TicketForm';
import TicketList from './TicketList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Dashboard: React.FC = () => {
  const { instance, accounts } = useMsal();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    instance.logoutPopup();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IT Helpdesk Portal
          </Typography>
          {accounts.length > 0 && (
            <>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {accounts[0].name}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Q&A Assistant" />
            <Tab label="Knowledge Base" />
            <Tab label="Create Ticket" />
            <Tab label="My Tickets" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <QuestionAnswer />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <KnowledgeBase />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <TicketForm />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <TicketList />
        </TabPanel>
      </Container>
    </Box>
  );
};

export default Dashboard;
