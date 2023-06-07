const express=require('express')
const router=express.Router();
 
const {getAllCustomer,newCustomer,deleteCustomer,getSingleCustomer,updateCustomer}=require('../controllers/client.controller')

router.get('/all-client',getAllCustomer);
router.post('/new-client/:id',newCustomer);
router.delete('/delete-client/:id/:idR',deleteCustomer)
router.get('/getSingleCustomer/:id',getSingleCustomer)
router.put('/updateCustomer/:id/:idR',updateCustomer)
module.exports=router