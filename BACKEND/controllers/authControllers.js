import bcrypt from 'bcrypt'
import User from '../models/User.model.js'
import signToken from '../utils/generateToken.js'

export const signup = async (req,res) => {
    try{
        const {user_name, pass, display_name } = req.body;

        const user = await User.findOne({user_name}).select("+pass_hash").lean();
        if(user){
            return res.status(400).json({error:"username already exist"})
        }

        const salt = await bcrypt.genSalt(10);
        const pass_hash = await bcrypt.hash(pass,salt)

        const newUser = new User({
            user_name,
            pass_hash,
            display_name,
        })

        if(newUser) {
            signToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                display_name: newUser.display_name,
                user_name: newUser.user_name,
                profile_pic: newUser.profile_pic,
            });
        }else{
            res.status(400).json({error: "Invalid user data"});
        }

    }catch(err){
        console.log("Sign up error: ",err)
        res.status(500).json({error: "Internal server error"});
    }
}

export const login = async (req, res) => {
    try{
        const {user_name, pass} = req.body;
        const user = await User.findOne({user_name}).select("+pass_hash").lean();
        if(!user){
            const fakeHash = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8p9c3lN6R0T8Y2N0S9hJpJZ9u8K9dG"
            await bcrypt.compare(pass, fakeHash)
            return res.status(401).json({error:"Login error: Invalid username or password"});
        }
        const isValidPass = await bcrypt.compare(pass,user.pass_hash);
        if(!isValidPass){
            return res.status(401).json({error:"Login error: Invalid username or password"});
        }
        delete user.pass_hash;
        signToken(user._id,res);
        res.status(200).json(user)
    }catch(err){
        console.log("Login error: ",err);
        res.status(500).json({error:"Login error: Internal server error"});
    }
}

export const logout = async (req,res) => {
    try{
        res.cookie("jwt","",{
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV==='prod',
            sameSite: 'strict',
        });
        res.status(200).json({message:"Logged out successfully"});
    }catch(err){
        console.log("Logout error: ",err.message);
        res.status(500).json({error:"Logout error: Internal server error"});
    }
}

export const session = async (req,res) => {
    try{
        res.status(200).json(req.user);
    }catch(err){
        console.log("Session error: ",err);
        res.status(500).json({error: "Session error: Internal server error"});
    }
}