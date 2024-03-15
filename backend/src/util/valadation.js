const {body}=require("express-validator")
const formatOfError=(errorOfArray)=>{
    return errorOfArray.map((err)=>{
        return err.msg
    })

}
const nameChain=()=>body("name").notEmpty().isString()
const emailChain=()=>body("email").notEmpty().isEmail()
const passwordChain=()=>body("password").notEmpty().isString().isLength({min:5}).withMessage("password must be at least 5 characters")

module.exports={nameChain,emailChain,passwordChain,formatOfError}