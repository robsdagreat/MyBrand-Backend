import jwt from 'jsonwebtoken';
import { jwtSecretKey } from "../utils.js";
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization || req.cookies.token;
    if (!token) {
        return res.redirect(req.originalUrl);
    }
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        const isAdmin = typeof decoded !== 'string' && decoded.role === 'admin';
        if (!isAdmin) {
            return res.redirect(req.originalUrl);
        }
        const isAdminLoggedIn = req.headers.adminToken || req.cookies.adminToken;
        if (!isAdminLoggedIn) {
            return res.redirect(req.originalUrl);
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.redirect(req.originalUrl);
    }
};
export default authMiddleware;
//# sourceMappingURL=dashboard.js.map