const express=require("express")
const router=express.Router();
const {getPremium}=require("..//controler/premium")
const {createExpense,getDayExpense,getMonthExpense,getYearExpense}=require("..//controler/expense")
const {addSalary}=require("..//controler/salary")
const Authinocate=require("..//middleware/authinocate")

router.get("/showDashboard",getPremium)
router.post("/addExpense",Authinocate,createExpense)
router.get("/getDayExpense",Authinocate,getDayExpense)
router.get("/getMonthExpense",Authinocate,getMonthExpense)
router.get("/getMonthExpense",Authinocate,getMonthExpense)
router.post("/addSalary",addSalary)
module.exports = router
