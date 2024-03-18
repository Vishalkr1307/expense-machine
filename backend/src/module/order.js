const {Sequelize,DataTypes}=require("sequelize")
const db=require("..//config/db")

const order= db.define("Order",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    paymentId:{
        type:DataTypes.STRING,

    },
    orderId:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    status:DataTypes.STRING
})

module.exports=order