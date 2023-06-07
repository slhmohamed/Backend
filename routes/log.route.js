const express=require('express')
const router=express.Router();
 
const {getLogByUser}=require('../controllers/log.controller')

router.get('/all-log/:id',getLogByUser);
 
module.exports=router