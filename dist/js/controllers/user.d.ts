import { Request, Response } from 'express';
declare const createUser: (req: Request, res: Response) => Promise<void>;
declare const getUserById: (req: Request, res: Response) => Promise<void>;
declare const updateUser: (req: Request, res: Response) => Promise<void>;
declare const deleteUser: (req: Request, res: Response) => Promise<void>;
declare const loginUser: (req: Request, res: Response) => Promise<void>;
export { loginUser, updateUser, deleteUser, createUser, getUserById };
