// controllers/comments.js
import CommentModels from "../models/comment.js";
const createComment = async (req, res) => {
    try {
        const { user, comment } = req.body;
        const { blogId } = req.params;
        const Comments = new CommentModels({
            user,
            comment,
            blogId,
        });
        const newComment = await Comments.save();
        res.status(201).json(newComment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
const getCommentsByBlogId = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await CommentModels.find({ blogId });
        res.status(200).json(comments);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
export { createComment, getCommentsByBlogId };
//# sourceMappingURL=comment.js.map