const Role= require("../model/roleModel")
module.exports.addRole=async(req,res)=>{
    
    const {nameRole}=req.body

    try{
        const existEmail = await Role.findOne({ nameRole });
        if (existEmail) {
            return res.status(400).json({ message: 'Role already exists' });
        }
        let role= new Role ({nameRole})
        await role.save()
        res.status(201).json({message:"role added successfully"})

    }
    catch(err){
        console.log(err)
        res.status(500).json("error in server")

    }
}