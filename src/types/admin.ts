import {Document} from 'mongoose';


export default interface IAdmin extends Document{
    email: string;
    password: string;
    _id: string
}