const TierList = require ('../../models/TierList');

const tierListSchema = `
  type TierListItem {
    id: String
    color: String
    text: String
    pictures: [String]
  }

  type TierList {
    id: ID
    description: String
    banner: String
    category: String
    nPictures: Int
    title: String
    items: [TierListItem]
    favorite: Boolean
    unassignedImages: [String]
  }

  input InputTierList {
    description: String
    banner: String
    category: String
    nPictures: Int
    title: String
    favorite: Boolean
    unassignedImages: [String]
  }
`;

const tierListQueries = `
    tierList(id: String): [TierList]
`;

const tierListMutations = `
    createTierList(id: String!, info: InputTierList!): TierList
    updateTierList(id: String!, info: InputTierList!): TierList
    toggleFavorite(id: String!): Boolean
    deleteTierList(id: String!): TierList
`;

const tierListRoot = {
    tierList: async ({id}) => {
        let res;
        if(id){
          res = await getTierList(id);
        }
        else{
          res = await getAllTierLists();
        }
        return res;
    },
    createTierList: async ({id, info}) => {
        return await createTierList(id, info);
    },
    updateTierList: async ({id, info}) => {
        return await updateTierList(id, info);
    },
    toggleFavorite: async ({id}) => {
        return await toggleFavorite(id);
    },
    deleteTierList: async ({id}) => {
        return await deleteTierList(id);
    },
};

function formatTierList(tierList, isSave = false) {
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

async function getAllTierLists(){
    let tierLists = await TierList.findAll();
    return tierLists. map( (tierListInfo) => {
        return formatTierList(tierListInfo);
    });
}

async function getTierList(id){
    let tierLists = await TierList.findAll({
        where:{
            id: id,
        },
    });
    return tierLists. map( (tierListInfo) => {
        return formatTierList(tierListInfo);
    });
}

async function createTierList(id, info){
    let tierListInfo = await TierList.findOne({
        where: {
            id: id,
        },
    });
    if(tierListInfo){
        tierListInfo = null;
    }
    else{
        tierListInfo = TierList.getEmpty();
        tierListInfo.id = id;
        Object.keys(info).forEach( (key) => {
            tierListInfo[key] = info[key];
        });
        let tierListToSave = formatTierList(tierListInfo, true);
        await TierList.create(tierListToSave);
    }
    return tierListInfo;
}
async function updateTierList(id, info){
    let tierListInfo = await TierList.findOne({
        where: {
            id: id,
        },
    });
    let response = null;
    if(tierListInfo){
        tierListInfo = formatTierList(tierListInfo);
        let tierListToSave = {};
        let fields = [];
        Object.keys(info).forEach( (key) => {
            tierListInfo[key] = info[key];
            tierListToSave[key] = info[key];
            fields.push(key);
        });
        tierListToSave = formatTierList(tierListToSave, true);
        await TierList.update(tierListToSave, {
            fields: fields,
            where: {
                id: id,
            },
        });
        tierListToSave.id = id;
        response = tierListInfo;
    }
    return response;
}

async function toggleFavorite(id) {
    let newValue = null;
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
    return newValue;
}

async function deleteTierList(id) {
    let tierList = await TierList.findOne({
        where: {
            id: id,
        },
    });
    if(tierList){
        tierList = formatTierList(tierList.dataValues);
        await TierList.destroy({
            where: {
                id: id,
            },
        });
    }
    return tierList;
}

module.exports = {
    tierListSchema: tierListSchema,
    tierListQueries: tierListQueries,
    tierListMutations: tierListMutations,
    tierListRoot: tierListRoot,
    formatTierList: formatTierList,
};