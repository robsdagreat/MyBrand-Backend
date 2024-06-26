import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../utils.js";

const adminLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }

        if (email !== process.env.ADMIN || password !== process.env.ADMINPASS) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ email, isAdmin: true }, jwtSecretKey, { expiresIn: '1h' });
        
        res.status(200).json({ message: 'Welcome back Admin!', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default adminLogin;
