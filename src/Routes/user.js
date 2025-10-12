const express = require('express');
const userRouter = new express.Router();
const {userauth}=require("../middleWare/auth");
const connectionRequestModel = require('../models/connectionRequest');
// Get all requests pendings
const USER_SAFE_DATA="firstName lastName age gender about skills";
userRouter.get('/user/requests/recieved', userauth,async(req,res)=>{

    try{
        const LoggedInuser=req.user;
        const connectionRequests=await connectionRequestModel.find({
            toUserId:LoggedInuser._id,
            status:"interested"

    }).populate("fromUserId",USER_SAFE_DATA);
    
    res.json({
        message:"Data fetched sucessfully",
        data:connectionRequests
    });

}
    catch(err){
        res.status(400).send("Error:"+err.message);
    }
});
userRouter.get("/user/connections",userauth,async(req,res)=>{
    try{
        const LoggedInuser=req.user;
        const connectionRequests=await connectionRequestModel.find(
            {
               $or:[
                {fromUserId:LoggedInuser._id,status:"accepted"},
                {toUserId:LoggedInuser._id,status:"accepted"}
               ],

            }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
            const data=connectionRequests.map((row)=>{
                if(row.fromUserId._id.toString()===LoggedInuser._id.toString())
                {
                    return row.toUserId;
                }
                else{
                    return row.fromUserId;
                }


            });
            res.json({data});
    }
    catch(err){
        res.status(400).send("Error:"+err.message);

    }
});
module.exports = userRouter;

