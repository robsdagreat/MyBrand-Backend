import { Document } from "mongoose";

export interface IComment extends Document {
  user: {
    userId: string;
    username: string;
  };
  comment: string;
  blogId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IComment;