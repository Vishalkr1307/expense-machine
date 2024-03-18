const express=require("express")
const router=express.Router()
const authinocate =require("..//middleware/authinocate")
const {premium,updatePremium}=require("..//controler/payment")

router.get("/premium",authinocate,premium)
router.post("/updatePremium",authinocate,updatePremium)

module.exports=router