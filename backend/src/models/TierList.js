const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database');

class TierList extends Model {

}

TierList.init({ 
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        tiers: {
            type: DataTypes.STRING
        },
        unassignedImages: {
            type: DataTypes.STRING
        },
    },
    {
    sequelize,
    modelName: 'TierList'
});

module.exports = TierList;