const express=require("express");
const {usermode}=require("../model/searchmodel")
// const jwt=require("jsonwebtoken");
const {client}=require("../redis/redis")
const iprouter=express.Router();
const {authusertoken}=require("../auth/authentiction");
const {validateIp}=require("../auth/ipadress")
const winston=require("winston");
const axios=require('axios')
const { json } = require("body-parser");




iprouter.get("/ip-detailes/:ip", authusertoken,validateIp,(req,res)=>{
    const ip=req.params.ip;
    const key=`ip-info:${ip}`;
    client.get(key,async (err, data)=>{
        if(err){
            winston.error(`Redis err: ${err.message}`)
            return res.status(500).send("something wrong")
        }
        if(data){
            const result=JSON.parse(data);
            return res.send(result)
        }else{
            try {
                const response= await axios.get(` https://ipapi.co/${ip}/json`);
                const city=response.data.city;
                const search=new  usermode({
                    userID:req.user.id,
                    ip:ip,
                    city:city
                })
                await search.save();
                client.setex(key,21600,JSON.stringify({city}))
                return res.send({city})
            } catch (error) {
                winston.error(`IP information err: ${error.message}`)
                res.send("something went wrong")
            }
        }
    })
});

module.exports={iprouter}