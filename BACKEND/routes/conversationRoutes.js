import express from "express";
import {startConversation, getConvo} from '../controllers/conversationController.js'
import protect from "../middlewares/protect.js";

const router = express.Router();

router.post('/startNewConvo',protect,startConversation);
router.get('/getConversations',protect,getConvo);

export default router