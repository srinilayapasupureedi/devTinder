const User = require("../models/user");
const jwt=require('jsonwebtoken');
const userauth=async (req,res,next)=>{
   const cookies=req.cookies;
   const token=cookies.token;
   if(!token){
       return res.status(401).send("Unauthorized");
   }  
   try{
       const decoded=jwt.verify(token,'mysecretkey');
       const userId=decoded._id;
        const user=await User.findById(userId);
         if(!user){  
            return res.status(404).send("User not found");
        }
       req.user=user;
       next();
   }
   catch(err){
       res.status(401).send("Invalid token");
   }
};
module.exports={userauth};
