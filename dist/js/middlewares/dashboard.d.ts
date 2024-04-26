import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
interface RequestWithUser extends Request {
    user?: JwtPayload;
}
declare const authMiddleware: (req: RequestWithUser, res: Response, next: NextFunction) => void;
export default authMiddleware;
