import { Schema, model, Model } from "mongoose";
import { IBlog } from "../types/blogs.js";


const blogSchema = new Schema({
  author: { type: String, default: 'Robert' },
  title: { type: String, required: true },
  story: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, default: Date.now },
  likes: { type: [String], default: [] }
}, { timestamps: true });

export default model<IBlog>("blogs", blogSchema);