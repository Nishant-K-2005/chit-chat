import express from  "express"
import {getMessages, sendMessage} from "../controllers/messageController.js"
import protect from "../middlewares/protect.js";

const router = express.Router();

router.post('/sendMessage',protect,sendMessage);
router.get('/getMessages/:conversationId',protect,getMessages);

export default router