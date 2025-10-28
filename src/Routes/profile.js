const express= require('express');
const {userauth}=require('../middleWare/auth');
const profileRouter=express.Router();
profileRouter.get('/profile',userauth,async(req,res)=>{
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
module.exports = profileRouter;
