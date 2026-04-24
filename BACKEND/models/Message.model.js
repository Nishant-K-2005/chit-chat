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
        default: "text",
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
        enum: ["pending","delivered","seen"],
        default: "pending",
    },
},{timestamps:true}) 

MessageSchema.index({conversation_id:1,createdAt:1});

const Message = mongoose.model('Message',MessageSchema);

export default Message;