import { Schema, model } from "mongoose";
const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    comment: { type: String, required: true },
}, { timestamps: true });
const blogSchema = new Schema({
    author: { type: String, default: 'Robert' },
    title: { type: String, required: true },
    story: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, default: Date.now },
    likes: { type: [String], default: [] },
    comments: { type: [commentSchema], default: [] },
}, { timestamps: true });
export default model("blogs", blogSchema);
//# sourceMappingURL=blogs.js.map