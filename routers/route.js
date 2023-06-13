const express=require('express')
const router=express.Router()

const {localupload}=require('../controllers/fileupload')
router.post("/localupload",localupload)
module.exports=router