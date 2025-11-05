const express=require('express');
const connectDB=require('./config/database');
const app=express();
const cookieParser = require('cookie-parser');
const { get } = require('mongoose');
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173", "http://51.21.182.160"], // 👈 Must match your React dev server
    credentials: true, // 👈 Enables cookies/session auth
  })
);
app.use(express.json()); // middleware to parse json body
app.use(cookieParser()); // parse cookies for all routes
const authRouter=require('./Routes/auth');
const profileRouter=require('./Routes/profile');
const userRouter=require('./Routes/user');
const requestRouter=require('./Routes/request');
app.use('/api',userRouter);
app.use('/api',profileRouter);
app.use('/api',authRouter);
app.use('/api',requestRouter);
app.use((req, res) => {
  res.status(404).send('Route not found');
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

