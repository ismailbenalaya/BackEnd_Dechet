const mongoose=require('mongoose')


const categorieSchema = new mongoose.Schema({
  type_Categorie:{type:String,require:true}

});

// Create the Model
const categorie = mongoose.model('Categorie', categorieSchema);

module.exports = categorie;