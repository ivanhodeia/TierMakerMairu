var express = require('express');
const TierList = require ('../models/TierList');
var router = express.Router();

/** GET ALL */
router.get('/', (req, res) => {
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
/** GET ONE */
router.get('/:id', (req, res) => {
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
/** PUT */
router.put('/:id', (req, res) => {
    //Aquí hay que modificar para comprobar si ya existe y editar en vez de insertar en ese caso ^^
    let { id } = req.params;
    let tierList = {
        id: id,
        ... req.body
    };
    TierList.create(tierList).then(() => {
        res.status(200).send({ 
            message: 'Inserted',
            data: tierList,
        });
    });
});
module.exports = router;
