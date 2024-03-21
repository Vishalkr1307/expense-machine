const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db");
const User = require("./user");
const task = db.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["food", "petrol", "salary"]],
    },
  }
  
});
// task.beforeCreate(async (task, options) => {
//     try {
      
      
      
  
      
//       task.setDataValue("totalPrice", task.User ? task.User.price + task.price : task.price);
//     } catch (error) {
//       console.error("Error calculating total price:", error);
//     }
//   })
module.exports = task;
