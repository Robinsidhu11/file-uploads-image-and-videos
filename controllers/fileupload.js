const fileModel=require('../model/file')
const { options } = require('../routers/route')
const cloudinary=require('cloudinary').v2
// any generic file upload on server
exports.localupload=async (req,res)=>{
    try{
            const {name,imageUrl,tags,email}=req.body
            console.log(name,imageUrl,tags,email)
            const file=req.files.imagefile
            // console.log(file)
            
            const path=__dirname +"/files/"+ Date.now()+ `.${file.name.split('.')[1]}`  //directory and file extension
            console.log(path)

            file.mv(path,(err)=>{
                //err fn just in case some erroroccur
                console.log(err)
            })

            res.status(200).json({
                success:true,
                message:"local file uploaded",
            })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"local file upload failed",
            error:err.message
        })
    }
}
// function to check validity of extension
function checkValidityOfExtension(ex,validatedExtensions){
    return validatedExtensions.includes(ex)
}
//fn to upload file on cloudinary
async function UploadToCoudinaryFn(file,folder,quality){
    const options={folder}

    //important 
    options.resource_type="auto"

    options.use_filename=true
    options.unique_filename =false
    if(quality) {
        options.quality = quality;
    }
    options.use_filename=true
    return await cloudinary.uploader.upload(file.tempFilePath,options)

}
// without compression, on cloudinary
exports.imageupload=async (req,res)=>{
    try{   
         const {name,imageUrl,tags,email}=req.body
            // console.log(name,imageUrl,tags,email)
            const file=req.files.imagefile
            console.log(file)
           
            // validating its proper image format
            const validatedExtensions=["png","jpg","jpeg"]
            if(! checkValidityOfExtension(file.name.split('.')[1],validatedExtensions)){
                return res.status(401).json({
                    success:false,
                    message:"not a valid image extension",
                })
            }
            // uploading to cloudinary fn takes too parameteres. file and  folder name(on cloudinary)
            const response=await UploadToCoudinaryFn(file,"filesuploaded")
            console.log(response )

            const resp=await fileModel.create({
                name,
                imageUrl:response.secure_url,
                tags,
                email
            })
            res.status(200).json({
                success:true,
                message:"image file uploaded to cloudinare and db entry created",
            })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"file upload failed",
            error:err.message
        })
    }
}

// without compression, on cloudinary
exports.videoupload=async (req,res)=>{
    try{   
         const {name,imageUrl,tags,email}=req.body
            // console.log(name,imageUrl,tags,email)
            const file=req.files.videofile
            console.log(file)
           
            // validating its proper image format
            const validatedExtensions=["mp4","mov","hd"]
            if(! checkValidityOfExtension(file.name.split('.')[1],validatedExtensions)){
                return res.status(401).json({
                    success:false,
                    message:"not a valid video extension",
                })
            }
            // uploading to cloudinary fn takes too parameteres. file and  folder name(on cloudinary)
            const response=await UploadToCoudinaryFn(file,"filesuploaded")
            console.log(response )

            const resp=await fileModel.create({
                name,
                imageUrl:response.secure_url,
                tags,
                email
            })
            res.status(200).json({
                success:true,
                message:"video file uploaded to cloudinare and db entry created",
            })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"file upload failed",
            error:err.message
        })
    }
}

//  compression, on cloudinary by using quality factor
exports.imagecompressupload=async (req,res)=>{
    try{   
         const {name,imageUrl,tags,email}=req.body
            // console.log(name,imageUrl,tags,email)
            const file=req.files.imagefile
            console.log(file)
           
            // validating its proper image format
            const validatedExtensions=["png","jpg","jpeg"]
            if(! checkValidityOfExtension(file.name.split('.')[1],validatedExtensions)){
                return res.status(401).json({
                    success:false,
                    message:"not a valid image extension",
                })
            }
            // uploading to cloudinary fn takes too parameteres. file and  folder name(on cloudinary)
            const response=await UploadToCoudinaryFn(file,"filesuploaded",20)
            console.log(response )

            const resp=await fileModel.create({
                name,
                imageUrl:response.secure_url,
                tags,
                email
            })
            res.status(200).json({
                success:true,
                message:"compressed image file uploaded to cloudinare and db entry created",
            })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"file upload failed",
            error:err.message
        })
    }
}