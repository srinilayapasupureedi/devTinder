const express=require('express');
const app=express();
//request handlers
app.use("/hello",(req,res)=>{
    res.send("Hello World from the /hello route");
});
app.use("/test",(req,res)=>{
    res.send("Hello World from the /test route");
});
app.use("/",(req,res)=>{
    res.send("Hello World from the server");
});
app.listen(7000,()=>{
    console.log("server started at 7000");
    //listening on port 7000
});