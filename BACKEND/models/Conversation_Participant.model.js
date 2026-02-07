import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const Conversation_Participant_Schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref:'Conversation',
    },
    conversation_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    unread_count: {
        type: Number,
    }
},{timestamps:true})

const Conversation_Participant = mongoose.model('Conversation_Participant', Conversation_Participant_Schema);

export default Conversation_Participant