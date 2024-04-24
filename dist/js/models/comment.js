import { Schema, model } from "mongoose";
const commentSchema = new Schema({
    user: {
        userId: { type: String },
        username: { type: String },
    },
    comment: { type: String, required: true },
    blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
}, { timestamps: true });
export default model("Comment", commentSchema);
//# sourceMappingURL=comment.js.map