import express, { Router } from 'express';
import { loginUser, updateUser, deleteUser, createUser, getUserById } from '../controllers/user.js';

const router: Router = express.Router();

router.use(express.json());

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         description: Bearer token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */
router.get('/user/:id', getUserById);

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 *       '409':
 *         description: Email already associated with an account
 *       '500':
 *         description: Server error
 */
router.post('/signup', createUser);

/**
 * @swagger
 * /api/user/edit/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User info updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */
router.put('/user/edit/:id', updateUser);

/**
 * @swagger
 * /api/user/delete/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */
router.delete('/user/delete/:id', deleteUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in user
 *     tags: [Users]
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
 *     responses:
 *       '200':
 *         description: Logged in successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Invalid email or password
 *       '500':
 *         description: Server error
 */
router.post('/login', loginUser);

export default router;
