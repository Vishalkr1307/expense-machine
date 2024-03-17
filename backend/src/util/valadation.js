const {body}=require("express-validator")
const formatOfError=(errorOfArray)=>{
    return errorOfArray.map((err)=>{
        return err.msg
    })

}
const nameChain=()=>body("name").notEmpty().isString().withMessage("it  must be a string")
const emailChain=()=>body("email").notEmpty().isEmail().withMessage("it must be a valid email address")
const passwordChain=()=>body("password").notEmpty().isString().isLength({min:5}).withMessage("password must be at least 5 characters")
const otpSchema=()=>body("otp").notEmpty().isString().isLength({min:4,max:4}).withMessage("otp must have a 4 character")
const priceSchema=()=>body("price").notEmpty().isNumeric().withMessage("price must be a number")
const descriptionSchema=()=>body("description").notEmpty().isString().withMessage("description must be a string")
const categorySchema=()=>body("category").notEmpty().isString().withMessage("description must be a string").custom(async (value)=>{
    if (value !== "food" && value !== "petrol" && value !== "salary") {
        throw new Error("Category does not match the valid strings");
    }
})

module.exports={nameChain,emailChain,passwordChain,formatOfError,otpSchema,priceSchema,descriptionSchema,categorySchema}