import {Request, Response, NextFunction} from 'express';
import jwt,{JwtPayload} from 'jsonwebtoken';
import { jwtSecretKey } from "../utils.js";

interface RequestWithUser extends Request {
    user?: JwtPayload; 
  }

const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || req.cookies.token;

  if (!token) {
    return res.redirect(req.originalUrl);
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);

    const isAdmin = typeof decoded !== 'string' && decoded.role === 'admin';

    if (!isAdmin) {
      return res.redirect(req.originalUrl);
    }

    const isAdminLoggedIn = req.headers.admintoken || req.cookies.admintoken;

    if (!isAdminLoggedIn) {
      return res.redirect(req.originalUrl);
    }

    req.user = decoded;

    next();
  } catch (err) {
    return res.redirect(req.originalUrl);
  }
};

export default authMiddleware