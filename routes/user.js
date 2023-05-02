const express=require("express");
const {usermode}=require("../model/usermodel")
const jwt=require("jsonwebtoken");
const {client}=require("../redis/redis")
const router=express.Router();
const {authusertoken}=require("../auth/authentiction");
const winston = require("winston/lib/winston/config");
require("dotenv").config()


router.post("/login", async (req,res)=>{
    const {email,password}=req.body;
    const user=await usermode.findOne({email,password});
    if(user){
        const accestoken=jwt.sign({email},process.env.jwt_accestoken);
        client.setex(accestoken)
        res.send(accestoken)
    }
    
})

router.post("/register", async (req,res)=>{
    const userdata=req.body;

    const data= new usermode(userdata);
    await data.save();
    res.send("singup succesfully")
})


router.post("/logout", authusertoken, (req,res)=>{
    const token=req.headers['authorization'].split(" ")[1];
    client.set(token, "EX", "1M",(err)=>{
        if(err){
            winston.error(err.message)
            res.send("something went wrong")
        }
        res.send()
    })
})

module.exports={router}