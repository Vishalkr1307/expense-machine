const jwt=require("jsonwebtoken")
require("dotenv").config()

const newToken=(user)=>{
    return jwt.sign({user:user,exp:Date.now()+60*1000*60*24},process.env.PRIVATE_KEY)

}
const verifyToken=(token)=>{
    return new Promise((res,rej)=>{
        jwt.verify(token,process.env.PRIVATE_KEY,(err,decode)=>{
            if(err){
                rej(err)
            }
            res(decode)
        })
    })
}
module.exports={newToken,verifyToken}