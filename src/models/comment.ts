import { Schema, model} from "mongoose";
import { IComment } from "../types/comments.js";

const commentSchema = new Schema(
  {
    user: {
      userId: { type: String},
      username: { type: String},
    },
    comment: { type: String, required: true },
    blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  },
  { timestamps: true }
);   

export default model<IComment>("Comment", commentSchema);