const express = require('express')
const router = express.Router()
const multerInstance = require("../middleware/file")
// Load Controllers
const {
 
    signin 
} = require('../controllers/auth.controller')

 

 
 
router.post('/signin', signin);
 

module.exports = router