import IContact from '../types/contact.js'
import {model, Schema} from 'mongoose'


const contactSchema : Schema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

export default model<IContact>("contact Queries", contactSchema);


