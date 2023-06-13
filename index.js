const express=require('express')
const app=express()

require('dotenv').config();

// middlewares

const fileuploader=require('express-fileupload')
app.use(fileuploader({
    // this flag should be true is imp, if we dont the when we send file through request it doesnt store anything at tempfile location
    useTempFiles:true,  
    tempFileDir:'/tmp/'
}))

const routes=require('./routers/route')
app.use("/api/v1",routes)



const cloudinaryConnectFn=require('./config/cloudinary')
cloudinaryConnectFn()

const dbConnectfn=require('./config/database')
dbConnectfn()

app.listen(process.env.PORT,()=>{
    console.log("port running ",process.env.PORT)
})
