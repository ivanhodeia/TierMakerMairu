const { buildSchema } = require('graphql');
const { userSchema, getAllUsers, getUser } = require('./resolvers/UserResolver');
const { tierListSchema, getAllTierLists, getTierList } = require('./resolvers/TierListResolver');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  ${userSchema}
  ${tierListSchema}

  type Query {
    user(email: String): [User]
    tierList(id: String): [TierList]
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  user: async ({email}) => {
    let res;
    if(email){
      res = await getUser(email);
    }
    else{
      res = await getAllUsers();
    }
    return res;
  },
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
};

module.exports = {
    schema: schema,
    root: root,
}