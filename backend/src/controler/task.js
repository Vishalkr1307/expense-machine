const Task=require("../module/task")
const {validationResult}=require("express-validator")
const {formatOfError}=require("..//util/valadation")



const addTask=async (req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(401).send(formatOfError(error.array()).join(","))
        }
        const task=await Task.create(req.body)

        return res.status(200).send(task)

    }
    catch(err){
        console.log(err)
        return res.status(400).send("Bad Request");
    }
}
const getTask=async (req,res)=>{
    try{
        let page=+req.query.page||1
        let limit=+req.query.limit||5
        let search=+req.query.search
        const skip=(page-1)*limit
        let task;
        let totalItem=await Task.count()
        if(!search){
            task=await Task.findAll({offset:skip,limit:limit})

        }
        else{
            task=await Task.findAll({where:{"description":search}})

        }
       


        return res.status(200).send({task,totalItem})

    }
    catch(err){
        return res.status(400).send("Bad Request");
    }
}
const singleTask=async (req,res)=>{
    try{
        const id=req.params.id;
        const task=await Task.findOne({where:{"id":id}})

        return res.status(200).send(task)

    }
    catch(err){
        return res.status(400).send("Bad Request");
    }
}
const updateTask=async (req,res)=>{
    try{
        const id=req.params.id;
        const task=await Task.update(req.body,{where:{"id":id}})

        return res.status(200).send(task)

    }
    catch(err){
        return res.status(400).send("Bad Request");
    }
}
const deleteTask=async (req,res)=>{
    try{
        const id=req.params.id;
        const task=await Task.destroy({where:{"id":id}})

        return res.status(200).send(task)

    }
    catch(err){
        console.log(err)
        return res.status(400).send("Bad Request");
    }
}

module.exports={addTask,getTask,singleTask,updateTask,deleteTask}