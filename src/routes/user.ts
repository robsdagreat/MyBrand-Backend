import express, { Router } from 'express';
import { loginUser, updateUser, deleteUser, createUser, getUserById } from '../controllers/user.js';

const router: Router = express.Router();

router.use(express.json());

router.get('/user/:id', getUserById);

router.post('/singup', createUser);

router.put('/edit/:id', updateUser);

router.delete('/delete/:id', deleteUser);

router.post('/login', loginUser);

export default router;
