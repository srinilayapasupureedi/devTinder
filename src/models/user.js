const mongoose = require('mongoose');
const validator = require('validator');
const userSchema=new mongoose.Schema({
    firstName:{
      type:String,
      required:true,
     
      
    },
    lastName:{
      type:String,
      required:true,
     

    },
    email:{
      unique:true,
      type:String,
      required:true,
      lowercase:true,
    
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email");
        } 
    },
    },
    password:{
      type:String,
      required:true,
      validate(value){
         if(!validator.isStrongPassword(value)){
             throw new Error("Weak password");
         }
      }
    },
    age:{
      type:Number,
      min:18,

    },
    gender:{
      type:String,
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