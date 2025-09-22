const express=require('express');
const connectDB=require('./config/database');
const User=require('./models/user');
const app=express();
app.post('/signup',async(req,res)=>{
     const user=new User({
        firstName:"srinilaya",
        lastName:"pasupureddi",
        email:"srinilaya@gmail.com",
        password:"password123",
        age:25,
        gender:"female"
     });
     try{
         await user.save();
        res.send("user added to db sucessfully")
     }
     catch(err){
         res.status(500).send("Error in saving user to db");

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
