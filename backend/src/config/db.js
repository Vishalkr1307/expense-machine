const {Sequelize}=require("sequelize")

const data=new Sequelize("expense-machine","root","Vishal@1307",{
    host:"localhost",
    dialect:"mysql"
})

module.exports=data