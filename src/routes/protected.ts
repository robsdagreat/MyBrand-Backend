import express, { Router, Request, Response, NextFunction } from 'express';
import authMiddleware from '../middlewares/dashboard';

const router: Router = express.Router();


router.get('/dashboard', authMiddleware, (req: Request, res: Response, next: NextFunction) => {

  res.sendFile('path/to/dashboard.html', { root: 'path/to/public' });
});

export default router;