import React from 'react';
import { render, screen } from '@testing-library/react';
import { PublicClientApplication } from '@azure/msal-browser';
import App from './App';
import { msalConfig } from './config/authConfig';

test('renders IT Helpdesk Portal', () => {
  const msalInstance = new PublicClientApplication(msalConfig);
  render(<App msalInstance={msalInstance} />);
  const titleElement = screen.getByText(/IT Helpdesk Portal/i);
  expect(titleElement).toBeInTheDocument();
});
