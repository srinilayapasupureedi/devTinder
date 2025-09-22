const mongoose = require('mongoose');
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://srinilayap_db_user:radhakrsna@database.ffu8kc1.mongodb.net/devTinder");
}
module.exports=connectDB;