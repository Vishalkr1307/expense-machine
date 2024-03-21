const { DataTypes, Sequelize } = require("sequelize");
const db = require("../config/db");

const Expense = db.define("Expense", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        // defaultValue:Sequelize.fn("NOW")
    },
    totalExpense: {
        type: DataTypes.INTEGER,
        allowNull: true 
    }
});

Expense.beforeCreate(async (expense, options) => {
    try {
        const userID = expense.UserId;
        const tasks = await Expense.findAll({ where: { "UserId": userID } });
        const totalExpense = tasks.reduce((current, item) => current + item.amount, 0);
        expense.setDataValue('totalExpense', totalExpense==0?expense.amount:totalExpense);
    } catch (error) {
        console.error("Error calculating totalExpense:", error);
        throw error;
    }
});

module.exports = Expense;
