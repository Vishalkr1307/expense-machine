const express=require("express")
const path=require("path");
var cors = require('cors')
const rootPath=path.join(path.dirname(process.mainModule.filename))


const app=express()
const User=require("./route/user")
const Task=require("./route/task")
const Payment=require("./route/payment")

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,'views')))
app.use("/auth",User)
app.use("/task",Task)
app.use('/payment',Payment)

// app.get("/",(req,res)=>{
//     res.sendFile(path.join(__dirname,'views' ,'home.html'))
// })
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'views' ,'navabar.html'))
})






module.exports=app