import express from 'express'
import { signup, login, session, logout } from '../controllers/authControllers.js'
import protect from '../middlewares/protect.js';

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",protect,logout);
router.get("/session",protect,session);

export default router