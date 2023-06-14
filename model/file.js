const mongoose=require('mongoose')
const nodemailer=require('nodemailer')
const fileModels=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
})
//post middlewares
fileModels.post("save",async function(doc){
    try{
        console.log("DOC: ",doc)

        //transponder 
        //ideally we should move this to config folder
        let transponder=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        //sending mail section is this:
        let info=await transponder.sendMail({
            from:'Robin and Co',
            to:doc.email,
            subject:"New File Uploaded on Cloudinary",
            html:`<h1>Hello</h1> <p>this is an automatically generated email because your upload was successfull</p> <p><a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        })
        console.log("INFO: ", info);
    }
    catch(err){
        console.error(error);
    }
})


module.exports=mongoose.model("filemodel",fileModels)