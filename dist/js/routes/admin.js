import express from 'express';
import adminLogin from '../controllers/admin.js';
const router = express.Router();
router.use(express.json());
/**
* @swagger
* tags:
*   name: Admin
*   description: Operations related to admin login
*
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Admin login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Admin email
 *         password:
 *           type: string
 *           description: Admin password
 */
/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     description: Authenticate admin and generate JWT token
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successful login
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Server error
 */
router.post('/admin/login', adminLogin);
export default router;
//# sourceMappingURL=admin.js.map