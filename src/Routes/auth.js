const express=require('express');
const authRouter=express.Router();
const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {validateSignupData}=require('../utilis/validate');
authRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body || {};
    if(!email || !password){
        return res.status(400).send('email and password are required');
    }
    try{
        const user=await User.findOne({email});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isValidPassword=await user.validatePassword(password);
        if(!isValidPassword){
            throw new Error("Invalid credentials");
        }
        else{
            //creating  a token
            const token= await user.getJWTToken();
            //storing the token in browsers cookie
            res.cookie('token',token,{expires:new Date(Date.now()+604800000)}); //7 days
            res.send(user);
        }
    }
    catch(err){
        res.status(401).send(err.message);
    }
});
authRouter.post('/signup',async(req,res)=>{
    try{
        if(!req.body){
            return res.status(400).send('request body is required');
        }
        validateSignupData(req);
        //Lets encrypt the password before saving
        const {firstName,lastName,email,password}=req.body;
        const  passwordHash=await bcrypt.hash(password,10);
        const user=new User({
            firstName,
            lastName,
            email,
            password:passwordHash
    });
         const savedUser = await user.save();
         const token= await savedUser.getJWTToken();
            //storing the token in browsers cookie
            res.cookie('token',token,{expires:new Date(Date.now()+604800000)}); //7 days
            res.json({message:"User added to db sucessfully",data:savedUser});
 }
    catch(err){
        return res.status(400).send(err.message);
    }
        
    
});
authRouter.post('/logout',async(req,res)=>{
    //logout only possible when you login
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send("logout sucessFully");

});
module.exports=authRouter;