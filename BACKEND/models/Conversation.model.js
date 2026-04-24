import mongoose, { mongo } from "mongoose";
const { Schema  } = mongoose


const conversationSchema = new Schema({
    convo_type:{
        type:String,
        enum:["personal","group"],
        default:"personal",
    },
    participants: [{
        type:Schema.Types.ObjectId,
        ref:'User',
        index:true,
    }],
    last_msg:{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default:null,
    },
    // messages: [{
    //     type:Schema.Types.ObjectId,
    //     ref: 'Message',
    //     default: [],
    // }]
},{timestamps:true})

const Conversation = mongoose.model('Conversation',conversationSchema);

export default Conversation;

