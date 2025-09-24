const express=require('express');
const connectDB=require('./config/database');
const User=require('./models/user');
const app=express();
app.use(express.json()); // middleware to parse json body
app.patch('/user',async(req,res)=>{
    const userId=req.body._id; 
    const data=req.body;
    try{
        const users=await User.findOneAndUpdate({_id:userId},data,{new:true});
        if(!users){
             res.status(404).send("No user found");
        }
        else{
                res.send("user updated successfully"); 
        }
    }
    catch(err){
        res.status(500).send("Error in updating user to db");
    }      
});

app.delete('/user',async(req,res)=>{
    const userId=req.body._id;
    try{
        const users=await User.findByIdAndDelete({_id:userId});
        if(!users){
             res.status(404).send("No user found");
        }
        else{
               res.send("user deleted successfully");
        }
    }
    catch(err){
        res.status(500).send("Error in deleting user from db");
    }
});
app.get('/user',async(req,res)=>{
    console.log(req.body._id);
    try{
        const users=await User.findById(req.body._id);
        if(!users){
             res.status(404).send("No user found");
        }
        else{
               res.send(users);
        }
           
    }
    catch(err){
        res.status(500).send("Error in fetching users from db");
    }
});
app.get('/user',async(req,res)=>{
    console.log(req.body.email);
    try{
        const users=await User.findOne({email:req.body.email});
        if(users.length==0){
             res.status(404).send("No user found");
        }
        else{
               res.send(users);
        }
           
    }
    catch(err){
        res.status(500).send("Error in fetching users from db");
    }
});
app.get('/feed',async(req,res)=>{
    console.log(req.query.email);
    try{
        const users=await User.find({});
        if(users.length==0){
             res.status(404).send("No user found");
        }
        else{
               res.send(users);

        }
           
    }
    catch(err){
        res.status(500).send("Error in fetching users from db");
    }
});
app.post('/signup',async(req,res)=>{
     const user=new User(req.body);
     try{
         await user.save();
        res.send("user added to db sucessfully")
     }
     catch(err){
         res.status(500).send("Error in saving user to db");

     }
});
connectDB()
.then(()=>{
    console.log("DB connected");
    app.listen(7000,()=>{
    console.log("server started at 7000");
});

})
.catch((err)=>{
    console.log("DB connection failed",err);
});
