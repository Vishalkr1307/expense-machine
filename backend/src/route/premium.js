const express=require("express")
const router=express.Router();
const {getPremium}=require("..//controler/premium")
const Authinocate=require("..//middleware/authinocate")

router.get("/showDashboard",getPremium)
module.exports = router
