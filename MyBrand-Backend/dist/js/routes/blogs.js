import express from 'express';
import { deleteBlog, updateBlog, addCommentToBlog, likeBlog, getBlog, createBlog, getAllBlogs } from '../controllers/blogs.js';
const blogRouter = express.Router();
blogRouter.use(express.json());
blogRouter.get("/blog/:id", getBlog);
blogRouter.post('/blog/:id/comment', addCommentToBlog);
blogRouter.post('/blog/:id/likes', likeBlog);
blogRouter.post("/blog/add", createBlog);
blogRouter.delete("/blog/delete/:id", deleteBlog);
blogRouter.put("/blog/edit/:id", updateBlog);
blogRouter.get("/blogs", getAllBlogs);
export default blogRouter;
//# sourceMappingURL=blogs.js.map