const express=require('express');
const connectDB=require('./config/database');
const User=require('./models/user');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const {validateSignupData}=require('./utilis/validate');
const app=express();
const {userauth}=require('./middleWare/auth');
const { get } = require('mongoose');
app.use(express.json()); // middleware to parse json body
app.use(cookieParser());//middleware to read(parse) the cookies
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
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
            //storing the token in cookie
            res.cookie('token',token,{expires:new Date(Date.now()+604800000)}); //7 days
            res.send("Login successful");
        }

    }
    catch(err){
        res.status(401).send(err.message);
    }
});
app.get('/profile',userauth,async(req,res)=>{
    try{
        const user=req.user;
        if(!user){
            return res.status(404).send("User not found");
        }
        res.send(user);
    }
    catch(err){
        res.status(401).send("Invalid token");
    }
});




app.get('/user',async(req,res)=>{
   
    try{
        const users=await User.find({email:req.body.email});
        if(users.length==0){
             res.status(404).send("No user found");
        }
        else{
               res.send(users);
        }
           
    }
    catch(err){
        res.status(500).send("Error in fetching users from db");
    }
});

app.post('/signup',async(req,res)=>{
    
    try{
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
         await user.save();
        res.send("user added to db sucessfully")
    }
    catch(err){
        return res.status(400).send(err.message);
    }
        
    
});
connectDB()
.then(()=>{
    console.log("DB connected");
    app.listen(7000,()=>{
    console.log("server started at 7000");
});

})
.catch((err)=>{
    console.log("DB connection failed",err);
});
