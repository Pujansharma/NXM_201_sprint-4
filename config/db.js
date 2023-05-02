const mongoose=require("mongoose");
require("dotenv").config()
const connection =mongoose.connect(process.env.mogodb_url);



module.exports={connection}