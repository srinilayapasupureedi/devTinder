const mongoose = require('mongoose');
const validator = require('validator');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
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
      // Password is stored as a bcrypt hash. Strength is validated before creating the user.
    },
    age:{
      type:Number,
      min:18,
      default:18,

    },
    gender:{
      type:String,
      validate(value){
         if(!["male","female","other"].includes(value)){  
            throw new Error("Invalid gender");
        }
      },
      default:"other",
    },
    about:{
      type:String,
      default:"this is the default about section",
    },
    skills:{
      type:[String],
      default:[],
    },
    profileImage:{
      type:String,
      default:"https://www.vecteezy.com/vector-art/25869648-monochrome-woman-avatar-silhouette-user-icon-vector-in-trendy-flat-design",
    }
},{timestamps:true});
userSchema.methods.getJWTToken=function(){
  const secret = process.env.JWT_SECRET || 'mysecretkey';
  const token= jwt.sign({_id:this._id}, secret, {expiresIn:'7d'});
  return token;
};
userSchema.methods.validatePassword=function(PasswordInputByUser){
    const user=this;
    const passwordHash=user.password;
    return bcrypt.compare(PasswordInputByUser,passwordHash);

}
module.exports=mongoose.model("User",userSchema);
//User is the name of the model