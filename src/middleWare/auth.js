const adminauth=(req,res,next)=>{
   console.log("admin  auth is called");
   const token="abc";
   const isauthorized=(token==="abc");
    if(isauthorized){
       next();
    }else{
       res.status(403).send("Unauthorized");
   }
};
const userauth=(req,res,next)=>{
   console.log("user auth is called");
   const token="abc";
   const isauthorized=(token==="abc");
    if(isauthorized){
       next();
    }else{
       res.status(403).send("Unauthorized");
   }
};
module.exports={adminauth,userauth};
