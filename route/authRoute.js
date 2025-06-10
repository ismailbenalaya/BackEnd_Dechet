const express = require("express")
const router = express.Router()
const auth =require("../controller/auth") 
router.post("/Login",auth.Login)
router.post("/forgetPassword",auth.forgetPassword)
router.post("/resetPassword/:token",auth.resetPassword)
module.exports=router
