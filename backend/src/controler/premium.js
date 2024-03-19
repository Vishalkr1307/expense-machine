const Task=require("..//module/task")
const User=require("..//module/user")
const {Sequelize}=require("sequelize")

const getPremium=async (req,res)=>{
    try{
        const premiumInfo=await Task.findAll({
            attributes:['userId',
            [Sequelize.literal('User.name'),'userName'],
            [Sequelize.fn("SUM",Sequelize.col('price')),'totalPrice'],
        ],
        include:[{
            model:User,
            attributes:[],
            required:true,

        }],
        group:['userId']
        })
        
        return res.status(200).send(premiumInfo)

    }
    catch(err){
        
        return res.status(500).send("internal server error")
    }
}
module.exports={getPremium}
