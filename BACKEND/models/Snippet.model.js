import mongoose from "mongoose";
const {Schema} = mongoose;

const SnippetSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,
    },
    media_url:{
        type: String,
        required:true,
    },
    media_type:{
        type:String,
        enum: ["image","video"],
        default:"image",
    },
    caption:{
        type:String,
    },
    expires_at:{
        type: Date,
        default: new Date(Date.now() + (24*60*60*1000))
    }
},{timestamps:true});

const Snippet = mongoose.model('Snippet',SnippetSchema);

export default Snippet;