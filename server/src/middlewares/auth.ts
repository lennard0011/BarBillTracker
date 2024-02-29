import { Request, Response, NextFunction } from 'express';
  
type AuthenticatedRequest = Request & {
    apiKey?: String;
}

const API_KEY = process.env.API_KEY;

// Authentication middleware
export function authenticateUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    // Extract username and password from the request body
    const apiKey = req.headers['api-key'];

    // Check if username and password are present
    if (!apiKey) {
      return res.status(401).json({ message: 'API key is required.' });
    }

    if (apiKey !== API_KEY) {
      return res.status(401).json({ message: 'Invalid API key.' });
    }

    // Call the next middleware in the chain
    next();
  };