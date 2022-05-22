const { buildSchema } = require('graphql');
const { userSchema, getAllUsers, getUser } = require('./resolvers/UserResolver');
const { tierListSchema, tierListQueries, tierListMutations, tierListRoot } = require('./resolvers/TierListResolver');

// Construct a schema, using GraphQL schema language
let schemaString = `
  ${userSchema}
  ${tierListSchema}

  type Query {
    user(email: String): [User]
    ${tierListQueries}
  }

  type Mutation {
    ${tierListMutations}
  }
`;
console.log("Schema", schemaString);
const schema = buildSchema(schemaString);
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
  ...tierListRoot
};

console.log("Root-> ", root);

module.exports = {
    schema: schema,
    root: root,
}