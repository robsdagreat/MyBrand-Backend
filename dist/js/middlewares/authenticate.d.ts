import { Request, Response, NextFunction } from "express";
interface AuthenticatedRequest extends Request {
    userId?: string;
    username?: string;
}
declare const authenticateUser: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export default authenticateUser;
