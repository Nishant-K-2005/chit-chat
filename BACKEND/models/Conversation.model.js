import mongoose, { mongo } from "mongoose";
const { Schema  } = mongoose

const conversationSchema = new Schema({
    type:{
        type: String,
        enum: ["One-to-One","Group"],
        default: "One-to-One",
    },
    last_msg:{
        type: Schema.Types.ObjectId('Message',)
    }
},{timestamps:true})

const Conversation = mongoose.model('Conversation',conversationSchema);

export default Conversation;

