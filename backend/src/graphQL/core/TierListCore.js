const TierListResolver = require('../resolvers/TierListResolver');

const tierListResolver = new TierListResolver();
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

  type Error {
    code: Int!
    msg: String!
  }

  type TierListArrayResponse {
    data: [TierList]
    errors: [Error]
  }

  type TierListResponse {
    data: TierList
    errors: [Error]
  }

  type BooleanResponse {
    data: Boolean
    errors: [Error]
  }

  input InputTierList {
    title: String!
    description: String!
    banner: String!
    category: String
    nPictures: Int
    nItems: Int
    favorite: Boolean
    unassignedImages: [String]
  }
`;
const tierListQueries = `
    tierList(id: String): TierListArrayResponse
`;
const tierListMutations = `
    createTierList(id: String!, info: InputTierList!): TierListResponse
    updateTierList(id: String!, info: InputTierList!): TierListResponse
    toggleFavorite(id: String!): BooleanResponse
    deleteTierList(id: String!): TierListResponse
`;
const tierListRoot = {
    tierList: async ({id}) => {
        let res;
        if(id){
          res = await tierListResolver.getTierList(id);
        }
        else{
          res = await tierListResolver.getAllTierLists();
        }
        return res;
    },
    createTierList: async ({id, info}) => {
        return await tierListResolver.createTierList(id, info);
    },
    updateTierList: async ({id, info}) => {
        return await tierListResolver.updateTierList(id, info);
    },
    toggleFavorite: async ({id}) => {
        return await tierListResolver.toggleFavorite(id);
    },
    deleteTierList: async ({id}) => {
        return await tierListResolver.deleteTierList(id);
    },
};

module.exports = {
    tierListSchema: tierListSchema,
    tierListQueries: tierListQueries,
    tierListMutations: tierListMutations,
    tierListRoot: tierListRoot,
};
