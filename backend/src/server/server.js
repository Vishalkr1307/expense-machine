const app=require("..//index")
const db=require("..//config/db")
require("dotenv").config()
const User=require("..//module/user")
const Task=require("..//module/task")
const Order=require("..//module/order")

const port=process.env.PORT ||8000
User.hasMany(Task)
Task.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)


db.sync().then((res)=>{
    console.log("database sync successful")
    app.listen(port,()=>{
        console.log(`listening on ${port}`)
    })

}).catch((err)=>console.log("database sync failed"))












