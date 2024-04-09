import IAdmin from '../types/admin.js'
import {model, Schema} from 'mongoose'

const adminSchema: Schema = new Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

export default model<IAdmin>('admin', adminSchema);


