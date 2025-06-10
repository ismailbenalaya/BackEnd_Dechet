const Categorie=require('../model/categorieModel')
module.exports.addCategorie = async (req, res) => {
    const { type_Categorie } = req.body;
    
    try {
        // Check if category already exists
        const categorie = await Categorie.findOne({ type_Categorie });
        if (categorie) {
            return res.status(400).json({ message: "Categorie exists" });
        }

        // Create new category correctly
        let categories = new Categorie({ type_Categorie });
        await categories.save();

        res.status(201).json({ message: "Categorie created successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error in server" });
    }
};

module.exports.getAllCategories=async(req,res)=>{
    try{
        const categories=await Categorie.find()
        res.status(200).json(categories)

    }
    catch(err){
        console.log(err)
        res.status(500).json("error in server")

    }
}
module.exports.getByIdCategorie=async(req,res)=>{
    const {categorieId}=req.params
    try{
        const categorie=await Categorie.findById(categorieId)
        if(!categorie){
            res.status(404).json({message:"categorie not found"})
        }
        console.log("categorie found")
        res.status(200).json(categorie)

    }
    catch(err){
        console.log(err)
        res.status(500).json("error in server")

    }
}