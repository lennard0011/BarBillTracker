import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
  
type AuthenticatedRequest = Request & {
    apiKey?: String;
}

dotenv.config();

const API_KEY = process.env.API_KEY;

// Authentication middleware
export function authenticateUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    // Extract the API key from the request headers
    const apiKey = req.headers['api-key'];

    // Check if API key is present
    if (!apiKey) {
      return res.status(401).json({ message: 'API key is required.' });
    }

    // Check if API key is correct
    if (apiKey !== API_KEY) {
      return res.status(401).json({ message: 'Invalid API key.' });
    }

    // Call the next middleware in the chain
    next();
  };