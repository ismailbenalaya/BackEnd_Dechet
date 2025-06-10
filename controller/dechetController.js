const Dechet = require("../model/dechetModel");
const Categorie = require("../model/categorieModel");


module.exports.addDechet = async (req, res) => {
    const { nom_dechet, type_dechet } = req.body;

    try {
        const category = await Categorie.findById(type_dechet);
        if (!category) {
            return res.status(400).json({ message: "Invalid category" });
        }

        const newDechet = new Dechet({ nom_dechet, type_dechet: category._id });
        await newDechet.save();

        res.status(201).json({
            message: "Dechet created successfully",
            dechet: newDechet
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports.getAllDechets = async (req, res) => {
    try {
        const dechets = await Dechet.find().populate("type_dechet");
        res.status(200).json(dechets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.getDechetById = async (req, res) => {
    try {
        const dechet = await Dechet.findById(req.params.id).populate("type_dechet");
        if (!dechet) {
            return res.status(404).json({ message: "Dechet not found" });
        }
        res.status(200).json(dechet);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
