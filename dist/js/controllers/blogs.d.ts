import { Request, Response } from "express";
import multer from 'multer';
declare const upload: multer.Multer;
interface AuthenticatedRequest extends Request {
    userId?: string;
    username?: string;
}
declare const createBlog: (req: Request, res: Response) => Promise<void>;
declare const getAllBlogs: (req: Request, res: Response) => Promise<void>;
declare const getBlog: (req: Request, res: Response) => Promise<void>;
declare const updateBlog: (req: Request, res: Response) => Promise<void>;
declare const deleteBlog: (req: Request, res: Response) => Promise<void>;
declare const likeBlog: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export { deleteBlog, getAllBlogs, updateBlog, likeBlog, getBlog, createBlog, upload };
