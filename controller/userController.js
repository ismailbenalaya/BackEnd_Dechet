const User= require("../model/userModel")
const Role= require("../model/roleModel")
const bcrypt = require("bcrypt");
module.exports.addUser = async (req, res) => {
    const { name, firstName, service ,  email, password,roleId } = req.body;
    

    try {
        // Check if user already exists
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const role=await Role.findById(roleId)
        if (!role) {
            return res.status(400).json({ message: 'RoleId not existed' });
        }

        // Create a new user
        const user = new User({
            name,
            firstName,
            email,
            password,
            roleId:role._id,
            service
        });

        await user.save();
        res.status(201).json({ message: 'User added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error in server', error: err.message });
    }
};

module.exports.getUserById=async(req, res)=>{
    try{
        const {userId} = req.params;
        const user = await User.findById(userId)
        if (!user){
            return res.status(404).json({message:"user not found"})

            

        }
        res.status(200).json(user)


    }
    catch(err){
        console.log(err)
        res.status(500).json("error in server")

    }

}
module.exports.deleteUser=async(req,res)=>{
    try{
        const {userId}=req.params
        const user= User.findById(userId)
        if (!user){
            res.status(404).json("not found")
        }
        await user.deleteOne()
        res.status(201).json("account deleted")


    }
    catch(err){
        console.log(err)
        res.status(500).json("error in server")


    }


}
module.exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, firstName, email, password } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "not found" });
        }

        let updateFields = { name, firstName, email };

        // Only hash and update password if provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt);
        }

        const updateUser = await User.findByIdAndUpdate(userId, updateFields);

        if (!updateUser) {
            return res.status(404).json({ message: "user not found" });
        }

        res.status(201).json({ message: "updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json("error in server");
    }
}
module.exports.getAllUsers=async(req,res)=>{
    try{
        const user = await User.find()
        res.json(user)

    }

    catch(err){
        console.log(err)
        res.status(500).json("error in server")
    }
}