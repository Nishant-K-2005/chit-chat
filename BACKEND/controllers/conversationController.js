import Conversation from '../models/Conversation.model.js'
import User from '../models/User.model.js'
import Message from '../models/Message.model.js'

export const startConversation = async (req, res) => {
    try {
        const { receiver_username, content } = req.body
        const sender = req.user
        const receiver = await User.findOne({ user_name: receiver_username })
        console.log(receiver_username + " " + receiver);
        if (!receiver) {
            console.log("New Conversation error: receiver with this username does not exist.")
            return res.status(404).json({ error: "User not found" })
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [sender._id, receiver._id], },
            convo_type: "personal",
        })

        if (conversation) {
            console.log("New conversation error: Conversation Already exist.")
            return res.status(409).json({ error: "Conversation Already exist." });
        }

        conversation = await Conversation.create({
            participants: [sender._id, receiver._id],
        })

        const firstMsg = await Message.create({
            conversation_id: conversation._id,
            sender_id: sender._id,
            content: content,
            message_type: "text",
        })
        conversation.last_msg = firstMsg._id;
        await conversation.save();
        conversation = await Conversation.findById(conversation._id)
            .populate("participants", "user_name display_name")
            .populate("last_msg", "content createdAt")
        return res.status(201).json(conversation);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "New Conversation error: Internal server error" });
    }
}


export const getConvo = async (req, res) => {
    try {
        const user = req.user
        const conversations = await Conversation.find({ participants: user._id })
            .populate("participants", "user_name display_name")
            .populate("last_msg", "content createdAt")
            .sort({ updatedAt: -1 })

        res.status(200).json({ convos: conversations })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Get Convo: Internal server error" });
    }
}
