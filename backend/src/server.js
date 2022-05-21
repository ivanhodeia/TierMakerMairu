const express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var { userSchema, getAllUsers, getUser } = require('./graphQL/resolvers/UserResolver');
var { tierListSchema, getAllTierLists, getTierList } = require('./graphQL/resolvers/TierListResolver');
var cors=require('cors');
const sequelize = require('./database/database');

sequelize.sync().then( () => {
    console.log('DB Ready');
});

const app = express();
const PORT = 8080;

const tierListsController = require('./routes/tierListController');
const authController = require('./routes/authController');
const picturesController = require('./routes/picturesController');

app.use(cors(
    {
        origin:true,
        credentials: true
    }
));

app.listen(PORT, () => {
    console.log(`listening on port -> ${PORT}`);
});

app.use( express.json());

// Construct a schema, using GraphQL schema language
console.log("Schema-> ", userSchema);
var schema = buildSchema(`
  ${userSchema}
  ${tierListSchema}

  type Query {
    user(email: String): [User]
    tierList(id: String): [TierList]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
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


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use('/api/tierlists', tierListsController);
app.use('/api/auth', authController);
app.use('/api/pictures', picturesController);

app.use( (req, res) => {
    res.status(404);
});
