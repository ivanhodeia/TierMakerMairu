const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database');

class TierList extends Model {
}

TierList.init({ 
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING
        },
        banner: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING
        },
        nPictures: {
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING
        },
        items: {
            type: DataTypes.STRING
        },
        favorite: {
            type: DataTypes.BOOLEAN   
        },
        unassignedImages: {
            type: DataTypes.STRING
        },
    },
    {
    sequelize,
    modelName: 'TierList'
});

TierList.getEmpty = () => {
    return {
        id: null,
        description: null,
        banner: null,
        category: 'others',
        nPictures: 0,
        title: null,
        items: [],
        favorite: 0,
        unassignedImages: [],
    };
}

module.exports = TierList;