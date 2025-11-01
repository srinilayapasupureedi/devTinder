const express= require('express');
const {userauth}=require('../middleWare/auth');
const profileRouter=express.Router();
profileRouter.get('/profile',userauth,async(req,res)=>{
    try{
        const user=req.user;
        if(!user){
            return res.status(404).send("User not found");
        }
        res.send(user);
    }
    catch(err){
        res.status(401).send("Invalid token");
    }
});
module.exports = profileRouter;


// profileRouter.get("/profile/view", userauth, async (req, res) => {
//   try {
//     const user = req.user;

//     res.send(user);
//   } catch (err) {
//     res.status(400).send("ERROR : " + err.message);
//   }
// });

// profileRouter.patch("/profile/edit", useruth, async (req, res) => {
//   try {
//     if (!validateEditProfileData(req)) {
//       throw new Error("Invalid Edit Request");
//     }

//     const loggedInUser = req.user;

//     Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

//     await loggedInUser.save();

//     res.json({
//       message: `${loggedInUser.firstName}, your profile updated successfuly`,
//       data: loggedInUser,
//     });
//   } catch (err) {
//     res.status(400).send("ERROR : " + err.message);
//   }
// });

module.exports = profileRouter;