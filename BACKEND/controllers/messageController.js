import Conversation from "../models/Conversation.model.js";
import Message from "../models/Message.model.js";
import { getIo } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try{
        const {convo_id, content, type= "text"} = req.body;
        const sender = req.user;
        const conversation = await Conversation.findOne({
            _id:convo_id,
            participants: sender._id
        });

        if(!conversation){
            return res.status(404).json({error:"Message error: Conversation not found"});
        }

        const newMsg = await Message.create({
            conversation_id:convo_id,
            sender_id: sender._id,
            content: content,
            message_type: type,
        })

        await conversation.updateOne({
            $set: {last_msg:newMsg._id},
        })

        const io = getIo()
        io.to(convo_id.toString()).emit("newMessage",newMsg);

        return res.status(201).json(newMsg)

    }catch(err){
        console.log("Message error: ",err.message);
        res.status(500).json({error:"Message error: Internal Server error"});
    }
}


export const getMessages = async (req,res) => {
    const user = req.user;
    try{
        const convoId = req.params.conversationId;
        const {lastMsgTimeStamp, limit=20} = req.query; 
        const conversation = await Conversation.findOne({
            _id:convoId,
            participants:user._id
        });
        if(!conversation){
            return res.status(404).json({error:"Get Message Error: Conversation not found"})
        }
        let query = {conversation_id:convoId}
        if(lastMsgTimeStamp){
            query.createdAt = { $lt : new Date(lastMsgTimeStamp) }
        }
        const messages = await Message.find(query)
            .sort({createdAt:-1})
            .limit(parseInt(limit));

        res.status(200).json(messages.reverse())
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Get Message Error: Internal Server Error"})
    }
}