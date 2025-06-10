const express = require('express');
const router = express.Router();
const dechetController = require('../controller/dechetController');


router.post('/addDechet', dechetController.addDechet);
router.get('/getAllDechets', dechetController.getAllDechets);
router.get('/getDechetById:id', dechetController.getDechetById);


module.exports = router; 
