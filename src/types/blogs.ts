import { Document } from "mongoose";
import IComment from '../types/comments.js'


export interface IBlog extends Document {
  author: string;
  title: string;
  story: string;
  image: string;
  date: Date;
  likes: string[];
}