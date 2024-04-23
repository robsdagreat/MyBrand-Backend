import express, { Router } from 'express';
import {
  deleteBlog,
  updateBlog,
  likeBlog,
  getBlog,
  createBlog,
  getAllBlogs,
  upload
} from '../controllers/blogs.js';
import authenticateUser from '../middlewares/authenticate.js';
import AuthenticateAdmin from '../middlewares/adminAuth.js';


const blogRouter: Router = express.Router();
blogRouter.use(express.json());

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Operations related to blogs
 * 
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         image:
 *           type: string
 *           description: URL of the blog image
 *         title:
 *           type: string
 *           description: Title of the blog
 *         author:
 *           type: string
 *           description: Author of the blog
 *         story:
 *           type: string
 *           description: Content of the blog
 */
/**
 * @swagger
 * /api/blog/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog
 *     responses:
 *       
 *       '200':
 *         description: Blog was found!
 *       '404':
 *         description: Blog not found!
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       
 */
blogRouter.get("/blog/:id", getBlog);



/**
 * @swagger
 * /api/blog/{id}/likes:
 *   post:
 *     summary: Like a blog
 *     tags: [Blogs]
 *     security: 
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog
 *     responses:
 *       '200':
 *         description: Blog liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '400':
 *         description: You already liked this blog
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Server error
 */
blogRouter.post('/blog/:id/likes', authenticateUser, likeBlog);

/**
 * @swagger
 * /api/blog/add:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     security: 
 *       - BearerAuth: []
 *     requestBody:        
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       '201':
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 */
blogRouter.post("/blog/add", AuthenticateAdmin, upload.single('image'), createBlog);

/**
 * @swagger
 * /api/blog/delete/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     security: 
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog
 *     responses:
 *       '200':
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '500':
 *         description: Server error
 */
blogRouter.delete("/blog/delete/:id", AuthenticateAdmin, deleteBlog);

/**
 * @swagger
 * /api/blog/edit/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     tags: [Blogs]
 *     security: 
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       '200':
 *         description: Blog updated successfully
 *         content:
 *           application/json:                 
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Server error
 */
blogRouter.put("/blog/edit/:id", AuthenticateAdmin,upload.single('image'), updateBlog);

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *       '200':
 *         description: A list of blogs.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '500':
 *         description: Server error.
 *         
 */

        
blogRouter.get("/blogs" , getAllBlogs)




export default blogRouter;
