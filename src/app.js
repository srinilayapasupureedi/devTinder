const express=require('express');
const app=express();

//error handling
app.use("/",(err,req,res,next)=>{
    if(err){
        console.log(err)
    res.status(500).send("something went wrong");
    }
});
app.get("/test",(req,res)=>{
    throw new Error("this is test error");
    res.send("test api");
});
app.use("/",(err,req,res,next)=>{
    if(err){
        console.log(err)
    res.status(500).send("something went wrong");
    }
});

const {adminauth, userauth}=require("./middleWare/auth");
app.use("/admin",adminauth);
app.get("/admin/getAllData",(req,res)=>{
    res.send("all data is here");
});
app.use("/user",userauth,(req,res)=>{
    res.send("user data is here");
})
app.get("/admin/deleteAllData",(req,res)=>{
    res.send("all data is deleted");
});

app.listen(7000,()=>{
    console.log("server started at 7000");
});