const express=require('express');
const app=express();

//request handlers
app.get("/user",(req,res)=>{
    res.send("Hello World from the  get/user route");
});

app.post("/user",(req,res)=>{
    //save the user to db
    res.send("Data saved successfully to db");
});
app.delete("/user",(req,res)=>{
    //save the user to db
    res.send("Data deleted successfully from db");
});
app.use("/user",(req,res)=>{
    res.send("Hello World from the use/user route");
});
app.use("/hello/2",(req,res)=>{
    res.send("Hello World from the /hello/2 route");
});
app.use("/hello",(req,res)=>{
    res.send("Hello World from the /hello route");
});

app.use("/test",(req,res)=>{
    res.send("Hello World from the /test route");
});
app.use("/",(req,res)=>{
    res.send("Hello World from the server");
});
app.listen(3000);