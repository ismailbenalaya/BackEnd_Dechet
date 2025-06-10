const express = require("express")
const router = express.Router()
const authAdmin =require("../controller/authAdmin") 
router.post("/login",authAdmin.Login)
module.exports=router