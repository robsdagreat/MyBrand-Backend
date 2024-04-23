import { Schema, model } from "mongoose";
const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    comment: { type: String, required: true },
}, { timestamps: true });
export const CommentModels = model("Comment", commentSchema);
//# sourceMappingURL=comment.js.map