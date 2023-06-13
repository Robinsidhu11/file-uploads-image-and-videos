// const fileModel=require('../model/file')

exports.localupload=async (req,res)=>{
    try{
            const file=req.files.imagefile
            console.log(file)
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

