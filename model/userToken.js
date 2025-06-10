const mongoose = require('mongoose');
const { schema } = require('./roleModel');
var SchemaToken = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    token:{type:String,required:true},
    createdAt:{type:Date,default:Date.now,expires:300}
})
module.exports=mongoose.model("tokenUser",SchemaToken)


