import { Schema, model } from 'mongoose';
import IUser from '../types/user.js';
import { nanoid } from 'nanoid'; 

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userId: { type: String, default: () => nanoid() } 
});

export default model<IUser>('users', userSchema);