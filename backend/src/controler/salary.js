const Salary=require("..//module/salary")

const addSalary=async(req,res)=>{
    try{
        // const salary=await Salary.create({description:"person",price:200,date:new Date()})
        // return res.send(salary)

    }
    catch(err){
        return res.status(500).send("Internal Server Error")
    }
}




module.exports={addSalary}




