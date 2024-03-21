const express=require("express")
const path=require("path");
const helmet=require("helmet")
const compresseion=require("compression")
var cors = require('cors')
const fs=require("fs")
const morgan=require("morgan")
const rootPath=path.join(path.dirname(process.mainModule.filename))
const https=require("https")

const accessSteam=fs.createWriteStream(path.join(__dirname,'acces.log'),{flags:'a'})


const app=express()
const User=require("./route/user")
const Task=require("./route/task")
const Payment=require("./route/payment")
const Premium=require("./route/premium")

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname,'views')))
// console.log(Buffer.toString())
app.use("/auth",User)
app.use("/task",Task)
app.use('/payment',Payment)
app.use('/premium',Premium)
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", "https://checkout.razorpay.com"],
        // Add other CSP directives as needed
      },
    })
  );
  app.use(compresseion())
  app.use(morgan('combined',{stream:accessSteam}))
  



app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'views' ,'navabar.html'))
})






module.exports=app