const express=require('express');
const app=express();


app.use("/user",[(req,res,next)=>{
    console.log("Router handler 1");
     next();
    //  res.send("Response from Router handler1");
},
(req,res)=>{
    console.log("Router handler 2");
   res.send("Response from Router handler 2");
},
(req,res)=>{
    console.log("Router handler 3");
   res.send("Response from Router handler 3");
}]);
app.listen(7000,()=>{
    console.log("server started at 7000");
});