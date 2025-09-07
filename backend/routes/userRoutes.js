const express = require('express')
const router = express.Router()
const User = require('../models/User.model.js');
const authMiddleware = require('../middleware/authMiddleware')


router.post('/create', authMiddleware, async (req, res) => {
    try {
        const uid = req.user.uid;

        const existingUser = await User.findById(uid);

        if (existingUser) {
            return res.status(400).json({ message: 'User profile already exists' });
        }
        const { email, displayName, photoURL } = req.body;
        
        const newUser = new User({
            _id: uid,
            email,
            displayName,
            photoURL,
        })
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error("Error creating user: ", err);
        res.status(500).json({ message: `Error creating user profile ${err}` });
    }
})

router.get('/profile',authMiddleware, async(req,res)=>{
    try{
        const userProfile = await User.findById(req.user.uid);
        if(!userProfile){
            return res.status(404).json({message:"User profile not found"});
        }
        res.json(userProfile);
    }catch(err){
        console.log("Error fetching user data",err);
        res.status(500).json({message:"Server error"});
    }
})

module.exports = router;