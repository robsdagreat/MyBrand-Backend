import jwt from 'jsonwebtoken';
import { jwtSecretKey } from "../utils.js";
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Authentication failed. Token missing!' });
        }
        let decoded;
        if (typeof token === 'string') {
            decoded = jwt.verify(token, jwtSecretKey);
        }
        else {
            throw new Error('Invalid token type');
        }
        req.userId = decoded.userId;
        req.username = decoded.name;
        req.role = decoded.role;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
export default authenticateUser;
//# sourceMappingURL=authenticate.js.map