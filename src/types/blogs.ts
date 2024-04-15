import { Document } from "mongoose";


export interface IBlog extends Document{
    author: string,
    title: string,
    story: string,
    image: string,
    date: Date,
    likes: string[];
    comments: {
        user: string;
        content: string;
    }[];
    
}

export interface IComment  extends Document{
    userId: string;
    text: string;
    username: string;
    timestamp: Date;  
}
