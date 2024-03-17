const {Sequelize,DataTypes}=require("sequelize")
const db=require("../config/db")
const User=require("./user")
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
User.hasMany(task)
task.belongsTo(User)

module.exports=task