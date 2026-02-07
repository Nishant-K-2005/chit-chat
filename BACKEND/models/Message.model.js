import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
    conversation_id: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
        index: true,
    },
    sender_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
    },
    message_type: {
        type: String,
        enum: ["text","image","video","doc","audio","link"],
        default: "Text",
    },
    file_url: {
        type: String,
        default: "",
    },
    file_name: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Pending","Delivered","Seen"],
        default: "Pending",
    },
},{timestamps:true}) 

const Message = mongoose.model('Message',MessageSchema);

export default Message;