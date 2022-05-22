const express = require('express');
var { graphqlHTTP } = require('express-graphql');
const { schema, root } = require('./graphQL/GraphQLCore');
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
