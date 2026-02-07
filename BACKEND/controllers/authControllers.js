import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.model'

export const signup = async (req,res) => {
    try{
        const {user_name, pass, display_name } = req.body

        const user = User.findOne({user_name});
        if(user){
            return res.status(400).json({error:"username already exist"})
        }

        const salt = await bcrypt.genSalt(10);
        pass_hash = await bcrypt.hash(pass,salt)

        const newUser = new User({
            user_name,
            pass_hash,
            display_name,
        })

    }catch(err){
        console.log(err)
    }
}