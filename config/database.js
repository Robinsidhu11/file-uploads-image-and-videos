const mongoose=require('mongoose')
require('dotenv').config()
const dbConnectfn=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("db connected")).catch((err)=>console.log("db not connected"))
}

module.exports=dbConnectfn