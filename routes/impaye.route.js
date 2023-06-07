const express = require('express')
const router = express.Router()
 
// Load Controllers
const {
   getByType, updateStatus, getAllImpaye,getSingleImpaye,getImpayeByClient,deleteImpaye,updateImpaye,searchImpaye,newImpaye
} = require('../controllers/impaye.controller')

 

 
router.post('/add-impaye/:id',newImpaye);
router.get('/searchImpaye/:num_compte/:status', searchImpaye);
router.delete('/deleteImpaye/:id', deleteImpaye);
router.get('/getImpayeByClient/:id', getImpayeByClient);
router.get('/getSingleImpaye/:id', getSingleImpaye);
router.get('/get-impayes', getAllImpaye);
router.get('/get-impayes-type/:type', getByType);

router.put('/updateStatus/:id/:idR',updateStatus)
 

module.exports = router