const express = require("express")
const router = express.Router()

const userController =require("../controller/userController") 
router.get("/getUserById/:userId",userController.getUserById)
router.post("/addUser",userController.addUser)
router.delete("/deleteUser/:userId",userController.deleteUser)
router.put("/updateUser/:userId",userController.updateUser)
router.get("/getAllUsers",userController.getAllUsers)
module.exports=router
