import jwt from 'jsonwebtoken';
import { jwtSecretKey } from "../utils.js";
const isAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Authentication failed!' });
            }
            const { email, isAdmin } = decoded;
            req.email = decoded.email;
            req.isAdmin = decoded.isAdmin;
            if (!isAdmin) {
                return res.status(403).json({
                    message: 'You are not allowed to access this resource, It is only for admins'
                });
            }
            next();
        });
    }
    else {
        res.status(401).json({ error: 'You\'re not logged in,!Please login to continue' });
    }
};
export default isAdmin;
//# sourceMappingURL=adminAuth.js.map