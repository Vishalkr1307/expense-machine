const express=require("express")
const path=require("path");
const rootPath=path.join(path.dirname(process.mainModule.filename))
console.log(rootPath)

const app=express()
const User=require("./route/user")
const Task=require("./route/task")

app.use(express.json())
app.use(express.static(path.join(__dirname,'views')))
app.use("/auth",User)
app.use("/task",Task)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'views' ,'home.html'))
})






module.exports=app