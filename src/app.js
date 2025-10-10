const express=require('express');
const connectDB=require('./config/database');
const app=express();
const cookieParser = require('cookie-parser');
const { get } = require('mongoose');
app.use(express.json()); // middleware to parse json body
app.use(cookieParser()); // parse cookies for all routes
const authRouter=require('./Routes/auth');
const profileRouter=require('./Routes/profile');
const userRouter=require('./Routes/user');
app.use('/',userRouter);
app.use('/',profileRouter);
app.use('/',authRouter);
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
