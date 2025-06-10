const mongoose = require('mongoose');


// Define a Schema
const roleSchema = new mongoose.Schema({
  nameRole:{type:String,require:true,unique:true}

});

// Create the Model
const role = mongoose.model('Role', roleSchema);

module.exports = role;
