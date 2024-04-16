import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../utils.js";
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }
        if (email !== process.env.ADMIN || password !== process.env.ADMINPASS) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jwt.sign({ email, isAdmin: true }, jwtSecretKey);
        const expiryDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
        res.cookie('jwt', token, { httpOnly: true, path: '/', expires: expiryDate }),
            res.status(200).json({ message: 'Welcome back Admin!', token });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
        return;
    }
};
export default adminLogin;
//# sourceMappingURL=admin.js.map