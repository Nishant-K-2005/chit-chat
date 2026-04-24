import jwt from "jsonwebtoken"
import User from "../models/User.model.js"

const protect = async (req,res,next) => {
    try{
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({error:"Unauthorized: No token provided"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error:"Unauthorized: Invalid Token"});
        }
        const user = await User.findById(decoded.userId).lean();

        if(!user){
            return res.status(404).json({error:"protect error: user not found"});
        }
        req.user = user;
        next();

    }catch(err){
        console.log("Error in auth middleware: ",err.message);
        res.status(500).json({error:"auth middleware: Internal Server error"});
    }
}

export default protect