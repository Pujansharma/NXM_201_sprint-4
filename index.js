const express=require("express");
const winston =require("winston")
const {router}=require("./routes/user")
require("dotenv").config();
const {connection}=require("./config/db")
// const {iprouter}=require("./routes/ip")

const app=express();
app.use(express.json());

app.get("/", async(req,res)=>{
    res.send("succesfull")
})

app.use("/user",router)
// app.use("/api/",iprouter)




app.listen(process.env.port||4500, async()=>{
    try {
        await connection;
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running on port ${process.env.port}`)
})