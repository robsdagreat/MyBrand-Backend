import { Request, Response, NextFunction } from "express";
interface AuthenticatedRequest extends Request {
    email?: string;
    isAdmin?: boolean;
}
declare const isAdmin: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export default isAdmin;
