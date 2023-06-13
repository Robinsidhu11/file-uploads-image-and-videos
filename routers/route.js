const express=require('express')
const router=express.Router()

const {localupload,imageupload,videoupload,imagecompressupload}=require('../controllers/fileupload')
router.post("/localupload",localupload)
router.post("/imageupload",imageupload)
router.post("/videoupload",videoupload)
router.post("/imagecompressupload",imagecompressupload)
module.exports=router