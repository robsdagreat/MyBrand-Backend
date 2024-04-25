import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtSecretKey } from '../utils.js';


interface AuthenticatedRequest extends Request {
  userId?: string;
  username?: string;
  role?: string;
}

const logout = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Authentication failed. Token missing!' });
      return;
    }

    let decoded: JwtPayload;
    if (typeof token === 'string') {
      decoded = jwt.verify(token, jwtSecretKey) as JwtPayload;
    } else {
      throw new Error('Invalid token type');
    }


    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default logout;