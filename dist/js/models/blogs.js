import { Schema, model } from "mongoose";
const blogSchema = new Schema({
    author: { type: String, default: 'Robert' },
    title: { type: String, required: true },
    story: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, default: Date.now },
    likes: { type: [String], default: [] }
}, { timestamps: true });
export default model("blogs", blogSchema);
//# sourceMappingURL=blogs.js.map