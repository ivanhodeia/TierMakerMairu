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
  }`;

function formatTierList(tierList, isSave = false) {
    if(isSave){
        tierList.items = JSON.stringify(tierList.items);
        tierList.unassignedImages = JSON.stringify(tierList.unassignedImages);
    }
    else{
        tierList.items = JSON.parse(tierList.items);
        console.log("ID-> ", tierList.id, "Items->", tierList.items);
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

module.exports = {
    tierListSchema: tierListSchema,
    formatTierList: formatTierList,
    getAllTierLists: getAllTierLists,
    getTierList: getTierList,
};