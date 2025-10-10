const express = require('express');
const userRouter = new express.Router();
const User = require('../models/user');
// Get user profile
userRouter.get('/user',async(req,res)=>{

    try{
        const email = req.query.email;
        if(!email){
            return res.status(400).send('email query parameter is required');
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send('No user found');
        }
        res.send(user);
           
    }
    catch(err){
        res.status(500).send("Error in fetching users from db");
    }
});
module.exports = userRouter;

