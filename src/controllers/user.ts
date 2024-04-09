import {Request,Response} from 'express'
import IUser from '../types/user.js'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtSecretKey } from '../utils.js'
import Joi from 'joi'



const createUserValidationSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'))
});

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const { error, value } = createUserValidationSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const { username, email, password } = value;

        const existUser = await User.findOne({ email });

        if (existUser) {
            res.status(409).json({ message: "Email address already associated with an account!" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        const newUser: IUser = await user.save();

        res.status(201).json({
            message: "User created successfully",
            userId: newUser._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const getUserById = async (req: Request, res: Response): Promise<void> =>{
     try{
        const{params: {id}} = req;

     const user: IUser | null = await User.findById(id);
     
     if(!user){
        res.status(404).json({message: 'User not found!'});
     }

     res.status(200).json({
        message: 'User found!',
        user: user
     });
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}


const updateUserValidationSchema = Joi.object({
    username: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
});

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { params: { id } } = req;

        const { error, value } = updateUserValidationSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const { username, email, password } = value;
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const updateUser: IUser | null = await User.findByIdAndUpdate(
            id,
            { username, email, password: hashedPassword },
            { new: true }
        );

        if (!updateUser) {
            res.status(404).json({ message: "User not found!" });
            return;
        }

        res.status(200).json({
            message: 'User info was updated successfully',
            user: updateUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const deleteUser= async (req: Request, res: Response): Promise<void> =>{
  try{const {params: {id}}=req;

  const deleteUser: IUser | null = await User.findByIdAndDelete(id);
  

  if(!deleteUser){
    res.status(404).json({message: 'User was not found!'});
  }

  res.status(200).json({
    message: 'User deleted!',
    user: deleteUser
  });
} catch(error){
    console.error(error);
    res.status(500).json({message: 'Server Error'});
}
}



const loginUserValidationSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required()
  });

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = loginUserValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ name: user.username, userId: user._id }, jwtSecretKey, {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {loginUser, updateUser, deleteUser,createUser, getUserById}