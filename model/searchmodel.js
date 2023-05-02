const mongoose=require("mongoose");

const searchSchema=mongoose.Schema({
    userId:{type: String, required:true},
    ip:{type:String, required:true},
    city:{type: String, required:true},
    creatdate:{type:Date, default:Date.now()}

})

const searchmodel=mongoose.model("search",searchSchema);


module.exports={searchmodel}