import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../utils.js';
const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Authentication failed. Token missing!' });
            return;
        }
        let decoded;
        if (typeof token === 'string') {
            decoded = jwt.verify(token, jwtSecretKey);
        }
        else {
            throw new Error('Invalid token type');
        }
        const isAdmin = decoded.isAdmin === true;
        const isUser = decoded.isAdmin === false;
        if (isAdmin || isUser) {
            res.status(200).json({ message: 'Logout successful' });
        }
        else {
            res.status(403).json({ message: 'Unauthorized' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
export default logout;
//# sourceMappingURL=logout.js.map