import { model, Schema } from 'mongoose';
const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});
export default model("contact Queries", contactSchema);
//# sourceMappingURL=contact.js.map