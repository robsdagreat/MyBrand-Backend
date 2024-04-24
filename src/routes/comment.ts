import express from "express";
import { createComment, getCommentsByBlogId } from "../controllers/comment.js";
import authenticateUser from '../middlewares/authenticate.js';


const router = express.Router();
router.use(express.json());

/**
 * @swagger
 * /api/{blogId}/comments/add:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 required: true
 *               username:
 *                 type: string
 *                 required: true
 *               comment:
 *                 type: string
 *                 required: true
 *               blogId:
 *                 type: string
 *                 required: true
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       '500':
 *         description: Server error
 */
router.post("/:blogId/comments/add/", authenticateUser, createComment);

/**
 * @swagger
 * /api/comments/{blogId}:
 *   get:
 *     summary: Get comments for a blog
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       '500':
 *         description: Server error
 */
router.get("/comments/:blogId", getCommentsByBlogId);

export default router;