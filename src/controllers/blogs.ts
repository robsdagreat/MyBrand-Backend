import { Request, Response } from "express";
import Blog from '../models/blogs.js'
import { IBlog } from "../types/blogs.js";
import Joi from "joi";

const blogValidationSchema = Joi.object({
    author: Joi.string().required(),
    title: Joi.string().required(),
    story: Joi.string().required(),
    image: Joi.string().required(),
    date: Joi.date().default(Date.now()),
    comments: Joi.array().items(Joi.string().required()),
    likes: Joi.array().items(Joi.string()), 
});

const updateBlogSchema = Joi.object({
    author: Joi.string().optional(),
    title: Joi.string().optional(),
    story: Joi.string().optional(),
    image: Joi.string().optional(),
    
});
                   

interface AuthenticatedRequest extends Request {
    userId?: string; 
}



const createBlog= async (req:Request, res:Response): Promise<void> =>{
try{ 

    const { error, value } = blogValidationSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }    
    const blog = new Blog(value);

   const newBlog: IBlog | null = await blog.save();

 res.status(200).json({
    message: "Blog created successfully",
    blogId: newBlog._id 

 });
} catch(error){

    console.error(error);
    res.status(500).json({message: "Server Error"})  
}
}

const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
       
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const getBlog = async(req:Request, res:Response): Promise<void> =>{
    try{

        if(!req.params || !req.params.id){  
            throw new Error("Blog ID is not found!");
        }
        const {params: {id}} = req;
        const blog = await Blog.findById(id);

        if(!blog){
            res.status(404).json({message: "Blog not found!"})
            return;
        } else{
            res.status(200).json({
                message: "Blog was found!",
                blog: blog
            });

        } 

    } catch(error){
       console.error(error);
       res.status(500).json({message: "Server Error"});
    }
}



const updateBlog = async(req: Request, res: Response): Promise<void> =>{
    try{

        const {params:{id},body} = req;

        const { error } = updateBlogSchema.validate(body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
    
        const updateBlog: IBlog | null = await Blog.findByIdAndUpdate(id, body, {new: true});
        if(!updateBlog){
            res.status(404).json({message: "Blog not found!"})
        }
        
        res.status(200).json({
           message: "Blog updated",
           blog: updateBlog
        })
       
    } catch(error){
        console.error(error);
        res.status(500).json({message: "Server Error"});
                                                                                                                            
    }   
}




const deleteBlog = async(req: Request, res: Response): Promise<void> =>{
    try{

    const {params: {id}}= req;
    
    const deleteBlog: IBlog | null = await Blog.findByIdAndDelete(id);

    res.status(200).json({
        message: "Blog deleted",
        blog: deleteBlog
    })}  catch(error){
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
}



 

const addCommentToBlog = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { params: { id }}= req;
        const  {userId} =req;
        const body = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
            res.status(404).json({ message: 'Blog not found!' }); 
        }else{
      const comment = {...body, user: userId}
        blog.comments.push(comment);
        const updatedBlog = await blog.save();
        res.status(201).json({ message: 'Comment added successfully', blog: updatedBlog });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};  



const likeBlog = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { params: { id }, userId } = req;
        const blog = await Blog.findById(id);
        if (!blog) {
            res.status(404).json({ message: 'Blog not found!' });
            return;
        }
        if (typeof userId !== 'string') {
            res.status(500).json({ message: 'Internal server error: Invalid user ID' });
            return;
       }
        if (blog.likes.includes(userId)) {
            res.status(400).json({ message: 'You already liked this blog' });
            return;
        }
        blog.likes.push(userId);
        const updatedBlog = await blog.save();
        res.status(200).json({ message: 'Blog liked successfully', blog: updatedBlog });
    } catch (error) {
        console.error('Error liking blog:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


          
export {deleteBlog,getAllBlogs, updateBlog,addCommentToBlog ,likeBlog, getBlog, createBlog}