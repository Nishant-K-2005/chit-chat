import mongoose from "mongoose"
const {Schema} = mongoose

const Message_Reaction_Schema = new Schema({
    message_id: {
        type: Schema.Types.ObjectId,
        ref:'Message',
        required: true,
        index:true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    emoji: {
        type: String,
        required: true,
    }
},{timestamp:true});

const MessageReaction = mongoose.model('MessageReaction',Message_Reaction_Schema);

export default MessageReaction;