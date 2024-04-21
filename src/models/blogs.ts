import { Schema, model, Model } from "mongoose";
import { IComment, IBlog } from "../types/blogs.js";

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

export const CommentModels: Model<IComment> = model<IComment>("Comment", commentSchema);

const blogSchema = new Schema({
  author: { type: String, default: 'Robert' },
  title: { type: String, required: true },
  story: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, default: Date.now },
  likes: { type: [String], default: [] },
  comments: { type: [commentSchema], default: [] },
}, { timestamps: true });

export default model<IBlog>("blogs", blogSchema);
