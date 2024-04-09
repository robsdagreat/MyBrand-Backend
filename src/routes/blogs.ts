import express, { Router } from 'express';
import {
  deleteBlog,
  updateBlog,
  addCommentToBlog,
  likeBlog,
  getBlog,
  createBlog,
  getAllBlogs
} from '../controllers/blogs.js';

import authenticateUser from '../middlewares/authenticate.js';
import AuthenticateAdmin from '../middlewares/adminAuth.js';



const blogRouter: Router = express.Router();

blogRouter.use(express.json());

blogRouter.get("/blog/:id", getBlog);

blogRouter.post('/blog/:id/comment', authenticateUser, addCommentToBlog);

blogRouter.post('/blog/:id/likes', authenticateUser, likeBlog);


blogRouter.post("/blog/add", AuthenticateAdmin, createBlog);


blogRouter.delete("/blog/delete/:id", AuthenticateAdmin, deleteBlog);

blogRouter.put("/blog/edit/:id",AuthenticateAdmin, updateBlog);


blogRouter.get("/blogs" , getAllBlogs)




export default blogRouter;
