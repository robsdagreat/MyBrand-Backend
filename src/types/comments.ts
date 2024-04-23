import { Document } from "mongoose";

export interface IComment extends Document {
    user?: string;
    username: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
  }

export default IComment  