const mongoose=require("mongoose");

const userschema=mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const usermode=mongoose.model("userdetailes",userschema);

module.exports={usermode}