const app=require("..//index")
const db=require("..//config/db")
const https=require("https")
const fs=require("fs")
require("dotenv").config()
const User=require("..//module/user")
const Task=require("..//module/task")
const Order=require("..//module/order")
const Salary=require("..//module/salary")
const Expense=require("..//module/expense")
const private_key=fs.readFileSync('server.key')
const certifacte=fs.readFileSync('server.cert')



const port=process.env.PORT ||8000
User.hasMany(Task)
Task.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)
User.hasMany(Salary)
User.hasMany(Expense)
// Salary.hasMany(Expense)
// Expense.belongsTo(Salary)


db.sync({force:false}).then((res)=>{
    console.log("database sync successful")
    app.listen(port,()=>{
        console.log(`listening on ${port}`)
    })
    // https.createServer({key:private_key,cert:certifacte},app).listen(port,()=>{
    //     console.log(`listening on ${port}`)
    // })

}).catch((err)=>console.log("database sync failed",err))












