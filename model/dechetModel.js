const mongoose = require("mongoose");

const dechetSchema = new mongoose.Schema(
    {
        nom_dechet: { type: String, required: true },
        type_dechet: { type: mongoose.Schema.Types.ObjectId, ref: "Categorie", required: true }
    },
    { timestamps: true } 
);

module.exports = mongoose.model("Dechet", dechetSchema);
