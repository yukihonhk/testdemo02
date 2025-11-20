import { Request, Response, NextFunction } from 'express';
import { ConfidentialClientApplication } from '@azure/msal-node';
import { authConfig } from '../config/config';

const msalConfig = {
  auth: {
    clientId: authConfig.clientId,
    authority: authConfig.authority,
    clientSecret: authConfig.clientSecret,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

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
    // In production, validate the JWT token properly
    if (token) {
      next();
    } else {
      res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
