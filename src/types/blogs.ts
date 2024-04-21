import { Document } from "mongoose";

export interface IComment extends Document {
    user?: string;
    username: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
  }

export interface IBlog extends Document {
  author: string;
  title: string;
  story: string;
  image: string;
  date: Date;
  likes: string[];
  comments: IComment[];
}