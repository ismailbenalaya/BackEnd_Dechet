const express = require("express")
const router = express.Router()
const categorieController=require("../controller/categorieController")
router.post("/addCategorie",categorieController.addCategorie)
router.get("/getAllCategories",categorieController.getAllCategories)
router.get("/getByIdCategorie/:categorieId",categorieController.getByIdCategorie)
module.exports=router