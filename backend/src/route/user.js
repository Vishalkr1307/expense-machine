const express=require("express")
const router=express.Router()
const {validationResult}=require("express-validator")
const {formatOfError,otpSchema,nameChain,emailChain,passwordChain}=require("..//util/valadation")
const {Register,Login,otpVerification,resendOtp,forgetPassword,resetPassword}=require("..//controler/user")


router.post("/register",nameChain(),emailChain(),passwordChain(),Register)
router.post("/login",emailChain(),Login)
router.post("/otpverification/:id",otpSchema(),otpVerification)
router.post("/resendotp/:id",resendOtp)
router.post("/forgetpassword",forgetPassword)
router.post("/forgetpassword/resetpassword/:id",resetPassword)




module.exports=router



