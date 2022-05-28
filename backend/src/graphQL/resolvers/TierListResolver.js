const { v4: uuidv4, } = require('uuid');
const TierList = require ('../../models/TierList');
const Error = require ('../../models/Error');

class TierListResolver {
    constructor(){}
    async getAllTierLists(){
        let tierLists = await TierList.findAll();
        let data = tierLists. map( (tierListInfo) => {
            return this.formatTierList(tierListInfo);
        });
        return {
            data: data,
            errors: null,
        };
    }
    async getTierList(id){
        let tierList = await TierList.findOne({
            where:{
                id: id,
            },
        });
        let errors = null;
        let data = null;
        if(tierList){
            data = [this.formatTierList(tierList),];
        }
        else{
            errors = [new Error(404)];
        }
    
        console.log("TierList-> ", tierList);
    
        return {
            errors: errors,
            data: data
        };
    }
    async createTierList(id, info){
        let tierListInfo = await TierList.findOne({
            where: {
                id: id,
            },
        });
        let errors = null;
        if(tierListInfo){
            tierListInfo = null;
            errors = [new Error(1)];
        }
        else{
            tierListInfo = TierList.getEmpty();
            tierListInfo.id = id;
            if(info.nItems){
                console.log("Default Items");
                let nItems = info.nItems;
                let items = [];
                for(let index = 0; index < nItems; index++){
                    let uuid = uuidv4();
                    let item = TierList.getEmptyItem(uuid);
                    items.push(item);
                }
                tierListInfo.items = [...items];
                delete info.nItems;
            }
    
            Object.keys(info).forEach( (key) => {
                tierListInfo[key] = info[key];
            });
            console.log("Tier List to Save-> ", tierListInfo);
            let tierListToSave = this.formatTierList({...tierListInfo}, true);
            await TierList.create(tierListToSave);
        }
        console.log("Info-> ", tierListInfo);
        return {
            data: tierListInfo,
            errors: errors,
        };
    }
    async updateTierList(id, info){
        let tierListInfo = await TierList.findOne({
            where: {
                id: id,
            },
        });
        let response = null;
        let errors = null;
        if(tierListInfo){
            tierListInfo = this.formatTierList(tierListInfo);
            let tierListToSave = {};
            let fields = [];
            Object.keys(info).forEach( (key) => {
                tierListInfo[key] = info[key];
                tierListToSave[key] = info[key];
                fields.push(key);
            });
            tierListToSave = this.formatTierList(tierListToSave, true);
            await TierList.update(tierListToSave, {
                fields: fields,
                where: {
                    id: id,
                },
            });
            tierListToSave.id = id;
            response = tierListInfo;
        }
        else{
            errors = [new Error(404)];
        }
        return {
            data: response,
            errors: errors,
        };
    }
    async toggleFavorite(id) {
        let newValue = null;
        let errors = null;
        let tierListInfo = await TierList.findOne({
            attributes: ['id', 'favorite',],
            where: {
                id: id,
            },
        });
        if(tierListInfo){
            tierListInfo = tierListInfo.dataValues;
            newValue = !tierListInfo.favorite;
            let params = { favorite: newValue};
            await TierList.update(params, {
                fields: ['favorite'],
                where: {
                    id: id,
                },
            });
        }
        else{
            errors = [new Error(404)];
        }
        return {
            data: newValue,
            errors: errors,
        };
    }
    async deleteTierList(id) {
        let errors = null;
        let tierList = await TierList.findOne({
            where: {
                id: id,
            },
        });
        if(tierList){
            tierList = this.formatTierList(tierList.dataValues);
            await TierList.destroy({
                where: {
                    id: id,
                },
            });
        }
        else{
            errors = [new Error(404)];
        }
        return {
            data: tierList, 
            errors: errors,
        };
    }

    formatTierList(tierList, isSave = false) {
        if(isSave){
            tierList.items = JSON.stringify(tierList.items);
            tierList.unassignedImages = JSON.stringify(tierList.unassignedImages);
        }
        else{
            tierList.items = JSON.parse(tierList.items);
            tierList.unassignedImages = JSON.parse(tierList.unassignedImages);
        }
        return tierList;
    }
}

module.exports = TierListResolver
