import { Request, Response } from 'express';
interface AuthenticatedRequest extends Request {
    userId?: string;
    username?: string;
    isAdmin?: boolean;
}
declare const logout: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export default logout;
