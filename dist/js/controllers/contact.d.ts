import { Request, Response } from "express";
declare const contactForm: (req: Request, res: Response) => Promise<void>;
declare const getAllContacts: (req: Request, res: Response) => Promise<void>;
export { getAllContacts, contactForm };
