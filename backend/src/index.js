const express=require("express")

const app=express()
const User=require("./route/user")

app.use(express.json())
app.use("/auth",User)






module.exports=app