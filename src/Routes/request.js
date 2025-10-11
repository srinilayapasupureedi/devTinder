const express=require('express');
const requestRouter=express.Router();
const User=require('../models/user');
const {userauth}=require('../middleWare/auth');
const connectionRequestModel  =require('../models/connectionRequest');
requestRouter.post("/request/send/:status/:toUserId",userauth,async(req,res)=>{
  try{
    
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;
    const allowedStatus=["ignored","interested"];
    if(!allowedStatus.includes(status))
    {
      return res.status(400).json({message:"inavalid status type:"+status});
    }
    const toUser=await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json({message:"user not found"});
    }
    const existingConnectionRequest=await connectionRequestModel.findOne({
      $or:[{
        fromUserId,toUserId
      },{
        fromUserId:toUserId,
        toUserId:fromUserId
      }

      ]});
      if(existingConnectionRequest){
        return res.status(400).send({
          message:"connection request already exists"
        });
      }

    const connectionRequest=new connectionRequestModel({fromUserId,toUserId,status});
    const data=await connectionRequest.save();
    res.json({
      message:"connection Request sent sucessfully",
      data
    });

  }
  catch(err){
    res.status(400).send("Error"+err.message);
  }
});
module.exports = requestRouter;