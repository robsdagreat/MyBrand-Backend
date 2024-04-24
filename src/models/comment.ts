import { Schema, model, Model } from "mongoose";
import { IComment } from "../types/comments.js";

const commentSchema = new Schema(
  {
    user: {
      userId: { type: String, required: true },
      username: { type: String, required: true },
    },
    comment: { type: String, required: true },
    blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  },
  { timestamps: true }
);

export const CommentModels: Model<IComment> = model<IComment>("Comment", commentSchema);