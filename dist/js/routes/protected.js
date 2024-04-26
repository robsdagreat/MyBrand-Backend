import express from 'express';
import authMiddleware from '../middlewares/dashboard.js';
const router = express.Router();
router.get('/dashboard', authMiddleware, (req, res, next) => {
    res.sendFile('path/to/dashboard.html', { root: 'path/to/public' });
});
export default router;
//# sourceMappingURL=protected.js.map