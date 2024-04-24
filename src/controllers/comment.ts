// controllers/comments.js
import CommentModels  from "../models/comment.js";
import { Request, Response } from "express"; 

const createComment = async(req: Request, res: Response): Promise<void> =>  {
  try {
    const { userId, username, comment, blogId } = req.body;
    const newComment = await CommentModels.create({
      user: userId,
      username,
      comment,
      blogId,
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getCommentsByBlogId = async(req: Request, res: Response): Promise<void> => {
  try {
    const { blogId } = req.params;
    const comments = await CommentModels.find({ blogId });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export {createComment, getCommentsByBlogId}