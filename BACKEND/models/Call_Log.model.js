import mongoose from "mongoose";
const { Schema } = mongoose;

const Call_Log_Schema = new Schema({
    conversation_id: {
        type: Schema.Types.ObjectId,
        ref:'Conversation',
        required: true,
        index: true,
    },
    caller_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    call_type: {
        type: String,
        enum: ["audio","video"],
        default: "audio",
    },
    status: {
        type: String,
        enum: ["ringing","missed","connected","declined","ongoing"],
        default: "ringing",
    },
    duration: {
        type: Number,
        default: 0,
    },
    started_at: {
        type: Date,
        default: Date.now,
    },
    ended_at: {
        type: Date,
    }
},{timestamps:true});

const CallLog = mongoose.model('CallLog',Call_Log_Schema);

export default CallLog;