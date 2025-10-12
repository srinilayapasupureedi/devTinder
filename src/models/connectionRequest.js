const mongoose=require("mongoose");
const User=require('./user');
const connectionRequestSchema=new mongoose.Schema(
  {
    fromUserId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:User,
    },
    toUserId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:User,
    },
    status:{
      type:String,
      enum:{
        values:["interested","ignored","accepted","rejected"],
        message:`{value} is not valid`
      }
    }

  },
  {
    timestamps:true,
  }
);
connectionRequestSchema.pre("save",function(next){
  const connectionRequest=this;
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("cannont send connection request to yourself");
  }
  next();
});
const connectionRequestModel=mongoose.model("connectionRequest",connectionRequestSchema);
module.exports=connectionRequestModel;