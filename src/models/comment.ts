import { Schema, model, Model } from "mongoose";
import { IComment} from "../types/comments.js";

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

export const CommentModels: Model<IComment> = model<IComment>("Comment", commentSchema);
