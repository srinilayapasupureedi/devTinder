const validator=require('validator');
const validateSignupData=(req)=>{
    const {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName)
    {
      throw new Error('First name and last name are required');
    }
    else if(!validator.isEmail(email))
    {
      throw new Error('Email is invalid');
    }
    if(!validator.isStrongPassword(password))
    {
      throw new Error('Password is not strong enough');
    }
}
const validateEditProfileData=(req)=>{
    const allowedFields=[
      "firstName",
      "lastName",
      "age",
      "gender",
      "skills",
      "about"
    ];
    const isEditAllowed=Object.keys(req.body).every((field)=>
    allowedFields.includes(field));
  return isEditAllowed;
}
const validateEditPassWord=(req)=>{
  if (!req.body) return false;
  const allowedFields=["password"];
  const isAllowedEdit=Object.keys(req.body).every((key)=>
  allowedFields.includes(key));
  return isAllowedEdit;
}
module.exports={validateSignupData,validateEditProfileData,validateEditPassWord};