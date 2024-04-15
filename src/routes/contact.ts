import express, { Router } from "express";
import contactForm from "../controllers/contact.js";

const router: Router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

/**
 * @swagger
 * tags:
 *   name: Contact Form
 *   description: Operations related to contacting via the form
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         message:
 *           type: string
 *           description: Message or opinion of user
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit a contact form query
 *     tags: [Contact Form]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               message:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Message sent successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 */

router.post('/contact', contactForm);
export default router;
