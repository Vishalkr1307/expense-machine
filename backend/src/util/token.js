const jwt=require("jsonwebtoken")
require("dotenv").config()

const newToken=(user)=>{
    return jwt.sign({user:user},process.env.PRIVATE_KEY)

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