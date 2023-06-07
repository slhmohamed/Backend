const express=require('express')
const router=express.Router();
const multerInstance = require("../middleware/file")
const {getAllUser,getSingleUser,deleteUser,updateUser,searchUser,addUser}=require('../controllers/user.controller')

router.get('/get-users/:id',getAllUser);
router.get('/get-user/:id',getSingleUser)
router.delete('/delete-user/:id/:idR',deleteUser)
router.put('/updateUser/:id',updateUser) 
router.get('/searchUser/:key',searchUser)
router.post('/add-user/:id',addUser)
module.exports=router