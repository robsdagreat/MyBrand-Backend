import express from 'express';
import adminLogin from '../controllers/admin.js';
const router = express.Router();
router.use(express.json());
router.post('/admin/login', adminLogin);
export default router;
//# sourceMappingURL=admin.js.map