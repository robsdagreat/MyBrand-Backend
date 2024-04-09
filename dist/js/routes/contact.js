import express from "express";
import contactForm from "../controllers/contact.js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post('/contact', contactForm);
export default router;
//# sourceMappingURL=contact.js.map