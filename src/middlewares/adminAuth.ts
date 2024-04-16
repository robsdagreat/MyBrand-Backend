import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from 'jsonwebtoken';
import { jwtSecretKey } from "../utils.js";


interface AuthenticatedRequest extends Request {
    email: string; 
    isAdmin: string;
}

const AuthenticateAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, jwtSecretKey, (err: any, decoded: any) => {
        if (err) {
          return res.status(403).json({ message: 'Failed to authenticate token' });
        }
  
        const { email, isAdmin } = decoded;
        req.email = decoded.email; 
        req.isAdmin = decoded.isAdmin;
  
        if (!isAdmin) {
          return res.status(403).json({
            message: 'You are not allowed to access this resource, It is only for admins'
          });
        }
  
        next();
      });
    } else {
      res.status(401).json({ error: 'You need to login to access this resource; Please login to continue' });
    }
  };

export default AuthenticateAdmin;