const { buildSchema } = require('graphql');
const {userSchema, userQueries, userRoot} = require('./core/UserCore');
const { tierListSchema, tierListQueries, tierListMutations, tierListRoot } = require('./core/TierListcore');

// Construct a schema, using GraphQL schema language
let schemaString = `
  ${userSchema}
  ${tierListSchema}

  type Query {
    ${userQueries}
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
  ... userRoot,
  ...tierListRoot
};

console.log("Root-> ", root);

module.exports = {
    schema: schema,
    root: root,
}