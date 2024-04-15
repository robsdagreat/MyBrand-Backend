import {Document} from 'mongoose'

export default interface IContact extends Document{
    name: string;
    email: string;
    message: string;
}