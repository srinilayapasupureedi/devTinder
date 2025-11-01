const express= require('express');
const {userauth}=require('../middleWare/auth');
const bcrypt = require('bcrypt');
const {validateEditProfileData,validateEditPassWord}=require('../utilis/validate');
const profileRouter=express.Router();



profileRouter.get('/profile/view',userauth,async(req,res)=>{
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
profileRouter.patch('/profile/edit', userauth, async (req, res) => {
    try{
    

    if(!validateEditProfileData(req))
    {
        throw new Error("Invalid edit request");
    }
    const LoggedInuser=req.user;
    console.log(LoggedInuser);
    Object.keys(req.body).forEach((key)=>{
        LoggedInuser[key]=req.body[key]
    });
    await LoggedInuser.save();

     console.log("✅ Profile updated successfully");
        res.status(200).json({
            message: "Profile updated successfully",
            data: LoggedInuser
        });

  }
  catch(err){
        console.error("❌ Profile update error:", err);
        res.status(400).json({
            message: "Error updating profile",
            error: err.message
        });

  }
});
profileRouter.patch('/profile/editPassWord',userauth,async(req,res)=>{
    try{
        console.log("PATCH body:", req.body);
    if(!validateEditPassWord(req))
    {
     throw new  Error("Invalid edit request");
    }
    const LoggedInuser=req.user;
    //LoggedInuser["password"]=req.body.password;
    LoggedInuser.password=await bcrypt.hash(req.body.password,10);
    await LoggedInuser.save();

    res.send("Password updated sucessFully");
}
catch(err){
    res.status(400).send("Error:"+err.message);
}

});

module.exports = profileRouter;