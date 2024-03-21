const Expense=require("..//module/expense")

const createExpense =async (req,res)=>{
    try{
        const user = req.user
        const task=await Expense.create({...req.body,UserId:user.id})
        
        
        
        return res.status(200).send(task)

    }
    catch(err){
        
        return res.status(500).send("internal server error")

    }

}
const getDayExpense =async (req,res)=>{
    try{
        const user=req.user

        const expense=await Expense.findAll({where:{UserId:user.id}})
        return res.status(200).send(expense)

    }
    catch(err){
        
    }

}
const getMonthExpense =async (req,res)=>{
    try{

    }
    catch(err){
        
    }

}
const getYearExpense =async (req,res)=>{
    try{
        const user=req.user

    }
    catch(err){
        return res.status(500).send("internal server error")
        
    }

}
module.exports={createExpense,getYearExpense,getDayExpense,getMonthExpense}