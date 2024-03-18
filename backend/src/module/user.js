const {Sequelize,DataTypes}=require("sequelize")
const db=require("..//config/db")

const user=db.define("User",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        // unique:true,

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        // unique:true,

    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        // unique:true,

    },
    verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    },
    isPremium:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    }
})
module.exports=user