import express, { Router } from 'express';
import logout from '../controllers/logout';

const router: Router = express.Router();
router.use(express.json());

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Operations related to authentication
 */

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: User logout
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Logout successful
 *       '401':
 *         description: Authentication failed or token missing
 *       '500':
 *         description: Server error
 */
router.post('/user/logout', logout);

/**
 * @swagger
 * /api/admin/logout:
 *   post:
 *     summary: Admin logout
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Logout successful
 *       '401':
 *         description: Authentication failed or token missing
 *       '500':
 *         description: Server error
 */
router.post('/admin/logout', logout);

export default router;
