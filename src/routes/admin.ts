import express, { Router } from 'express';
import adminLogin from '../controllers/admin.js';

const router: Router = express.Router();
router.use(express.json());

router.post('/admin/login', adminLogin);

export default router;
