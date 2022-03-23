const express = require('express');
const app = express();
const PORT = 8080;


app.listen(PORT, () => {
    console.log(`listening on port -> ${PORT}`);
});

app.use( express.json());

app.get('/api/tierList', (req, res) =>{
    let status = 200;
    let tierLists = [
        {
            id: 1,
            name: 'A',
            desc: 'DescA',
            tiers: []
        },
        {
            id: 2,
            name: 'B',
            desc: 'DescB',
            tiers: []
        },
    ];
    res.status(status).send(tierLists);
});

app.get('/api/tierList/:id', (req, res) =>{
    let status = 200;
    let { id } = req.params;
    let tier = {
        id: id,
        name: 'A',
        desc: 'DescA',
        tiers: []
    };
    res.status(status).send(tier);
});

app.use( (req, res) => {
    res.status(404);
});
