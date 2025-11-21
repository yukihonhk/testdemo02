import { Request, Response, NextFunction } from 'express';
import { ConfidentialClientApplication } from '@azure/msal-node';
import { authConfig } from '../config/config';

// Only initialize MSAL if credentials are provided
let cca: ConfidentialClientApplication | null = null;

if (authConfig.clientId && authConfig.clientSecret && authConfig.authority) {
  const msalConfig = {
    auth: {
      clientId: authConfig.clientId,
      authority: authConfig.authority,
      clientSecret: authConfig.clientSecret,
    },
  };
  
  try {
    cca = new ConfidentialClientApplication(msalConfig);
  } catch (error) {
    console.warn('MSAL initialization failed, running in mock mode');
  }
}

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.substring(7);
    
    // For now, we'll accept any token format
    // In production, validate the JWT token properly using cca
    if (token) {
      next();
    } else {
      res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
