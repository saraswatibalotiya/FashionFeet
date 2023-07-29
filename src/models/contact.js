const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name :{type:String,required:true},
    email :{type:String,required:true},
    address :{type:String,required:true},
    queries :{type:String,required:true}
})


const User = new mongoose.model('Contact',userSchema);
module.exports= User;