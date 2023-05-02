const jwt=require("jsonwebtoken");
const {client}=require("../redis/redis")
require("dotenv").config();
const authusertoken=(req,res,next)=>{
    const header=req.headers['authorization'];
    const token=header.split(" ")[1];

    if(!token){
        return res.send("please login first")
    }else{
        client.get(token,(err,result)=>{
            if(err) return  res.send("something went wrong")
               
             if(result) return res.sendStatus(403);
                
            jwt.verify(token,process.env.jwt_accestoken,(err,user)=>{
                if(err) return res.send(403);
                req.user=user;
                next()
            })
            
        })
    }
}

module.exports={authusertoken}