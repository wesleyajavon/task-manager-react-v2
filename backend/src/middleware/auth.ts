import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied' });
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
    return;
  }
};
