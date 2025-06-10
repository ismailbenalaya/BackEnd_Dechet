const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const adminSchema = new mongoose.Schema(
    {
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: { 
            type: String, 
            required: true, 
            
        },
        resetToken: { 
            type: String 
        },
        resetTokenExpire: {
             type: Date 
        }
    }
)
adminSchema.pre('save',async function(next){
    const admin = this;
    if (admin.isModified('password')||admin.isNew) {
       try{
           const salt = await bcrypt.genSalt(10);
           const hash = await bcrypt.hash(admin.password,salt)
           admin.password = hash;
           next();
       }catch(err){
           return next (err);
       }
    }else{
       return next();
    }
   });
   adminSchema.methods.comparePassword = async  function (condidatPassword){
    return bcrypt.compare(condidatPassword,this.password)}
const admin = mongoose.model("Admin", adminSchema);

module.exports = admin;