const app=require("..//index")
const db=require("..//config/db")
require("dotenv").config()

const port=process.env.PORT ||8000

db.sync().then((res)=>{
    console.log("database sync successful")
    app.listen(port,()=>{
        console.log(`listening on ${port}`)
    })

}).catch((err)=>console.log("database sync failed"))












