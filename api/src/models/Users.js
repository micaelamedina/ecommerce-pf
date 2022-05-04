const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("Users", { 
        legajo_user:{
            type: DataTypes.INTEGER(),
       
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        user_password: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        rol: {
            type: DataTypes.STRING(),
            allowNull: false,
        }
    },{timestamps: false})
};