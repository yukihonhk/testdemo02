import React, { useEffect } from 'react';
import { MsalProvider, useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { IPublicClientApplication } from '@azure/msal-browser';
import { ThemeProvider, createTheme, CssBaseline, Button, Box, Container, Typography, Paper } from '@mui/material';
import Dashboard from './components/Dashboard';
import { setAuthToken } from './services/api';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function LoginPage() {
  // const { instance } = useMsal();

  const handleLogin = () => {
    // For demo purposes, we'll use mock authentication
    // In production, use the MSAL instance:
    // const { instance } = useMsal();
    // instance.loginPopup();
    
    // Mock login - set a fake token
    setAuthToken('mock-token');
    window.location.reload();
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            IT Helpdesk Portal
          </Typography>
          <Typography variant="body1" paragraph align="center" color="text.secondary">
            Sign in with your organization account to access the helpdesk
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" size="large" onClick={handleLogin}>
              Sign In (Demo Mode)
            </Button>
          </Box>
          <Typography variant="caption" display="block" sx={{ mt: 2 }} align="center" color="text.secondary">
            In production, this would integrate with Microsoft Entra ID
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

function AppContent() {
  const { accounts } = useMsal();

  useEffect(() => {
    // Set auth token when authenticated
    if (accounts.length > 0) {
      setAuthToken('mock-token');
    }
  }, [accounts]);

  // For demo purposes, we'll show the dashboard directly
  // In production, use the AuthenticatedTemplate/UnauthenticatedTemplate
  const isAuthenticated = accounts.length > 0 || localStorage.getItem('mock-auth') === 'true';

  if (!isAuthenticated && window.location.pathname === '/') {
    // Set mock auth for demo
    localStorage.setItem('mock-auth', 'true');
    setAuthToken('mock-token');
  }

  return (
    <>
      <AuthenticatedTemplate>
        <Dashboard />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        {isAuthenticated ? <Dashboard /> : <LoginPage />}
      </UnauthenticatedTemplate>
    </>
  );
}

interface AppProps {
  msalInstance: IPublicClientApplication;
}

function App({ msalInstance }: AppProps) {
  return (
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </MsalProvider>
  );
}

export default App;
