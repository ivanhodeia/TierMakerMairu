const express = require('express');
const sequelize = require('./database/database');

sequelize.sync().then( () => {
    console.log('DB Ready');
});


const app = express();
const PORT = 8080;

var tierListsRouter = require('./routes/tierLists');

app.listen(PORT, () => {
    console.log(`listening on port -> ${PORT}`);
});

app.use( express.json());


app.use('/api/tierList', tierListsRouter);

app.use( (req, res) => {
    res.status(404);
});
