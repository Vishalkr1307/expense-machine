const express=require("express")
const router=express.Router()
const {validationResult}=require("express-validator")
const {formatOfError,nameChain,emailChain,passwordChain}=require("..//util/valadation")
const {Register,Login}=require("..//controler/user")


router.post("/register",nameChain(),emailChain(),passwordChain(),Register)
router.post("/login",nameChain(),Login)




module.exports=router



