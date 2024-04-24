import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userId: { type: String, default: () => nanoid() }
});
export default model('users', userSchema);
//# sourceMappingURL=user.js.map