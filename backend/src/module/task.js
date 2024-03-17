const {Sequelize,DataTypes}=require("sequelize")
const db=require("../config/db")
const task=db.define("Task",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isIn:[['food','petrol','salary']]
        }
    }
})

module.exports=task