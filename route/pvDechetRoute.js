const express = require('express');
const router = express.Router();



const pvDechetController=require("../controller/pvDechetController")


router.post('/createPvDechet',pvDechetController.createPvDechet)
router.get('/getAllPvDechetsByUser/:userId',pvDechetController.getAllPvDechetsByUser)
router.post("/SavePvDechet",pvDechetController.SavePvDechet)
router.put("/fromSavedtoValidated/:pvDechetId",pvDechetController.fromSavedtoValidated)
router.put("/UpdatePvDechet/:dechetId",pvDechetController.UpdatePvDechet)
router.get("/getPvDechetById/:pvDechetId",pvDechetController.getPvDechetById)
router.put("/modifyPvDechet/:pvDechetId",pvDechetController.modifyPvDechet)
router.put("/validatePvByAQ/:pvDechetId" , pvDechetController.validatePvByAQ)
router.get('/getPvDechetsByAQ', pvDechetController.getPvDechetsForAQ);
router.get('/getValidatedPvByAQ', pvDechetController.getValidatedPvByAQ);
router.put("/validatePvByHSE/:pvDechetId", pvDechetController.validatePvByHSE);
router.get('/getPvDechetsForHSE', pvDechetController.getPvDechetsForHSE);
router.get('/getValidatedPvByHSE', pvDechetController.getValidatedPvByHSE);
router.get('/generateDechetPdf/:pvDechetId',pvDechetController.generateDechetPdf);


module.exports=router