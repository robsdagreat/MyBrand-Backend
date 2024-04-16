import jwt from 'jsonwebtoken';
import { jwtSecretKey } from "../utils.js";
const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Unauthorized. Token missing!' });
            return;
        }
        let decoded;
        if (typeof token === 'string') {
            decoded = jwt.verify(token, jwtSecretKey);
        }
        else {
            throw new Error("Invalid token type");
        }
        if (decoded && decoded.isAdmin) {
            next();
        }
        else {
            res.status(403).json({ message: 'Not authorized as admin' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
export default isAdmin;
//# sourceMappingURL=adminAuth.js.map