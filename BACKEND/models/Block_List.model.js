import mongoose from "mongoose";
const { Schema } = mongoose

const Block_List_Schema = new Schema({
    blocked_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    blocker_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const BlockList = mongoose.model('BlockList',Block_List_Schema);

export default BlockList;