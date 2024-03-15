const {Sequelize,DataTypes}=require("sequelize")
const db=require("..//config/db")

const otp=db.define("Otp",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    userId:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    otp:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    expiredAt:{
        type:DataTypes.DATE,
        allowNull:false,
    }

})
module.exports=otp