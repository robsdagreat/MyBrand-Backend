import { Request, Response } from "express";
declare const createComment: (req: Request, res: Response) => Promise<void>;
declare const getCommentsByBlogId: (req: Request, res: Response) => Promise<void>;
export { createComment, getCommentsByBlogId };
