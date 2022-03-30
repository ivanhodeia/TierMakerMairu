const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database');

class User extends Model {

}

User.init({ 
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },    
    },
    {
    sequelize,
    modelName: 'User'
});

module.exports = User;