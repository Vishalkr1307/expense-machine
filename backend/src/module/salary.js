const {Sequelize,DataTypes}=require("sequelize")
const db=require("..//config/db")
const Salary=db.define("Salary",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    date:{
        type:DataTypes.DATEONLY,
        // defaultValue:Sequelize.fn("NOW")
    },
    totalSalary:{
        type:DataTypes.INTEGER,
        get(){
            return this+this.amount

        }
    }

})
Salary.beforeCount(async (salary,options)=>{
    console.log(salary,options)
})

module.exports=Salary