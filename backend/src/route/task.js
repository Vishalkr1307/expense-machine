const express=require("express")
const router=express.Router()
const {addTask,getTask,singleTask,updateTask,deleteTask}=require("..//controler/task")
const {priceSchema,descriptionSchema,categorySchema}=require("..//util/valadation")
const authinocate =require("..//middleware/authinocate")


router.post("/addTask",authinocate,priceSchema(),descriptionSchema(),categorySchema(),addTask)
router.get("/getTask",authinocate,getTask)
router.get("/singleTask/:id",authinocate,singleTask)
router.put("/updateTask/:id",updateTask)
router.patch("/updateTask/:id",authinocate,updateTask)
router.delete("/deleteTask/:id",authinocate,deleteTask)

module.exports=router