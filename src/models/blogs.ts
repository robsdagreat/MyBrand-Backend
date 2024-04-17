import { timeStamp } from "console";
import { IBlog } from "../types/blogs.js";
import { Schema, model } from "mongoose";

const blogSchema: Schema= new Schema({
    author:{
        type: String,
        default: 'Robs_dagreat'

    },
    title:{
        type: String,
        required: true

    },
    story:{
        type: String,
        required: true
    
    },
    image:{
        type: String,
        required: true

    },
    date:{
        type: Date,
        default: Date.now,

    },
    likes: {
        type: [String],
        default: [],
    },
    comments: {
        type: [
            {
                user: String,
                content: String,
            },
        ],
        default: [],
    },                                
},
{timestamps: true}
)    


export default model<IBlog>("blogs", blogSchema)