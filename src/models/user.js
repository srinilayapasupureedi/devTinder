const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    firstName:{
      type:String,
      required:true,
      minlength:3,
      maxlength:30,
      
    },
    lastName:{
      type:String,
      required:true,
      minlength:3,
      maxlength:30,

    },
    email:{
      unique:true,
      type:String,
      required:true,
      lowercase:true,
      minlength:5,
      maxlength:100,
      validate(value){
        const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!emailRegex.test(value)){
          throw new Error("Invalid email");
        }
      }
    },
    password:{
      type:String,
      required:true,
    },
    age:{
      type:Number,
      min:18,

    },
    gender:{
      type:String,
      required:true,
      validate(value){
        if(!["male","female","other"].includes(value)){
          throw new Error("Invalid gender");
        }
      },
    },
    about:{
      type:String,
      default:"this is the default about section",
    }
},{timestamps:true});
module.exports=mongoose.model("User",userSchema);