import { model, Schema } from 'mongoose';
const adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});
export default model('admin', adminSchema);
//# sourceMappingURL=admin.js.map