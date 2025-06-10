const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Role= require('./roleModel')
// Define a Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  roleId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Role"
    
  },
  service: 
  {
    type: String,
    required: true,
  },
  verificationToken:{
    type:String

  },
  resetToken:{
    type:String

  },
  resetTokenExpire:{
    type:Date
  }
});
userSchema.pre('save',async function(next){
    const user = this;
    if (user.isModified('password')||user.isNew) {
       try{
           const salt = await bcrypt.genSalt(10);
           const hash = await bcrypt.hash(user.password,salt)
           user.password = hash;
           next();
       }catch(err){
           return next (err);

       }

    }else{
       return next();
    }
   });
   userSchema.methods.comparePassword = async  function (condidatPassword){
    return bcrypt.compare(condidatPassword,this.password)
 }
// Create the Model
const user = mongoose.model('User', userSchema);

module.exports = user;
