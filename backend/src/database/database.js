const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('db', 'user', 'password', {
    dialect: 'sqlite',
    host: 'database/db.sqlite',
});

module.exports = sequelize;
