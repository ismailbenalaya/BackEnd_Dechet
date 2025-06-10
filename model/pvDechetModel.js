const mongoose = require('mongoose');
const user = require('./userModel');
const dechetModel = require('./dechetModel');

const pvDechetSchema = new mongoose.Schema(
  {
    Date_Creation: { type: Date, required: true },
    Id_User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    Nature_Dechet: { type: mongoose.Schema.Types.ObjectId, ref: "Categorie", required: true },
    Type_Dechet: { type: Number, required: true },
    Service_Emetteur: { type: String, required: true },
    Designation: { type: String, required: true },
    Quantite: { type: Number, required: true },
    Num_lot: { type: Number, max: 99999, required: true },
    Motif_Rejet: { type: String, required: true },
    Commentaire: { type: String, required: true },
    statut: { type: String, enum: ["valider", "enregistrer"], required: true },
    updateCount: {
      type: Number,
      default: 0
    },
    AQ_Commentaire: { type: String },
    AQ_Quantite_Avant: { type: Number },
    AQ_Quantite_Apres: { type: Number },
    AQ_Validated: { type: Boolean, default: false },
    AQ_User : {type: mongoose.Schema.Types.ObjectId, ref: "User", Option: true},
    HSE_User: { type: mongoose.Schema.Types.ObjectId, ref: "User", Option: true },
    HSE_Commentaire: { type: String },
    HSE_Validated: { type: Boolean, default: false },
  
  },
  { timestamps: true }
);

// Create the Model
const pv_Dechet = mongoose.model("pv_Dechet", pvDechetSchema);

module.exports = pv_Dechet;
