const User = require('../model/userModel.js');
const Admin = require('../model/adminModel.js')
const PvDechet= require ('../model/pvDechetModel.js');
const bcrypt=  require ('bcrypt');


module.exports.createAdmin = async(req, res) => {
    try {
      const { email, password } = req.body;
      // No hashing, store password as plain text (not secure)
      const admin = new Admin({ email, password });
      await admin.save();
      res.status(201).json({ message: 'Utilisateur créé avec succès', admin });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


module.exports.getAllUsers = async (req, res) => {
  try {
    const { roleId } = req.query; // Extract roleId from query parameters
    const filters = {};
    if (roleId) filters.roleId = roleId; // Apply roleId filter if provided

    const users = await User.find(filters)
      .select('-password -resetToken -resetTokenExpire') // Exclude password, resetToken, and resetTokenExpire
      .populate('roleId', 'nameRole'); // Populate role schema
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in server" });
  }
};


// Count the number of users with a specific role 
module.exports.countUsersByRole = async (req, res) => {
    try {
      const { roleId } = req.params; // Get roleId from request parameters
  
      const count = await User.countDocuments({ roleId }); // Count users with the specified roleId
  
      res.status(200).json(count); // Return the count in the response
    } catch (err) {
      console.error("Error counting users by role:", err);
      res.status(500).json({ message: 'Error counting users by role', error: err.message });
    }
  };
// Count the number of users :
module.exports.countUsers = async (req, res) => {
    try {
      const count = await User.countDocuments(); // Count all users
      res.status(200).json(count); // Return the count in the response 
      console.log("Total number of users:", count); // Log the total number of users 
    } catch (err) {
      console.error("Error counting users:", err);
      res.status(500).json({ message: 'Error counting users', error: err.message });
    }
  };
module.exports.getAllPvHistory = async (req, res) => {
  try {
    const { statut, userId } = req.query;
    const AQ_ROLE_ID = "67ccb0a866312e8af97a1f3e";
    const HSE_ROLE_ID = "67ccb0ae66312e8af97a1f41";
    const aqUser = await User.findOne({ roleId: AQ_ROLE_ID });
    const hseUser = await User.findOne({ roleId: HSE_ROLE_ID });

    const filters = {};
    if (statut) filters.statut = statut;
    if (userId) filters.Id_User = userId;

    const pvList = await PvDechet.find(filters)
      .populate('Id_User', 'name firstName')
      .populate('Nature_Dechet')
      .sort({ createdAt: -1 });

    // Send AQ and HSE user info with the PV list
    res.json({ pvList, aqUser, hseUser });
  } catch (err) {
    console.error("Erreur dans getAllPvHistory:", err);
    res.status(500).json({ message: 'Erreur lors de la récupération de l’historique', error: err.message });
  }
};
  
  module.exports.getUserById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await User.findById(id).select('-password'); // Ne pas renvoyer le mot de passe
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
  
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération de l’utilisateur', details: err.message });
    }
  };



// Delete a user by ID :
module.exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
       await user.deleteOne(); // Remove the user from the database
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur', details: err.message });
    }
  };





// count PV Dechet 
module.exports.countPvDechet = async (req, res) => {
  try{
    const count = await PvDechet.countDocuments(); // Count all PV Dechet
    res.status(200).json(count); // Return the count in the response 
    console.log("Total number of PV Dechet:", count); // Log the total number of PV Dechet
  }catch(err){
    console.error("Error counting PV Dechet:", err);
    res.status(500).json({ message: 'Error counting PV Dechet', error: err.message });
  }
}

module.exports.UpdateProfileAdmin = async (req, res) => {
  const { adminId } = req.params;
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }
    const { email, password, confirmPassword } = req.body;

    if (email) {
      admin.email = email;
    }
    if (password) {
      if (!confirmPassword) {
        return res.status(400).json({ message: "confirmPassword is required" });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      const hashed = await bcrypt.hash(password, 10);
      admin.password = hashed;
    }
    await admin.save();
    res.status(200).json({ message: "admin updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in server" });
  }
}

module.exports.createUser = async (req, res) => {
  try {
    const { name, email, password , service } = req.body;
    // Accept both firstName and firstname
    const firstName = req.body.firstName || req.body.firstname;
    const roleId = req.body.roleId || req.query.roleId;

    if (!firstName) {
      return res.status(400).json({ message: 'firstName is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    // Hash the password
    const hashed = await bcrypt.hash(password, 10);
    // Create new user
    const user = new User({
      name,
      firstName, // Always use the correct field name for the model
      email,
      password: hashed,
      roleId,
      service
    });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};