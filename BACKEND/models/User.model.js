import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    pass_hash: {
        type: String,
        required: true,
    },
    display_name: {
        type: String,
        index: true,
        trim: true
    },
    profile_pic: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        maxlength: 120,
    },
    is_online: {
        type: Boolean,
    }
},{timestamps:true})


const User = mongoose.model('User',userSchema);

export default User;