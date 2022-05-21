var express = require('express');
const TierList = require ('../models/TierList');
const { formatTierList } = require('../graphQL/resolvers/TierListResolver');
const { authenticateToken } = require('../tokenController');
var router = express.Router();

/** GET ALL */
router.get('/', authenticateToken, (req, res) => {
    let status = 200;
    console.log("Hola");
    TierList.findAll().then( (response) => {
        let tierLists = response.map( (tierListInfo) => {
            return formatTierList(tierListInfo);
        });
        res.status(status).send(tierLists);
    },
    (error) => {
        console.log("Error", error);
    });
});
/** GET ONE */
router.get('/:id', authenticateToken, (req, res) => {
    let status = 200;
    let { id } = req.params;
    TierList.findAll({
        where: {
            id: id,
        },
    }).then( (response) => {
        let tierList = response[0];
        if(tierList){
            tierList = formatTierList(tierList);
        }
        else{
            status = 400;
        }
        res.status(status).send(tierList);
    });
});
/** POST */
router.post('/save', authenticateToken, (req, res) => {
    let tierList = {
        ... req.body
    }
    if(!tierList.pictures) {
        tierList.pictures = [];
    }
    TierList.findAll({
        where: {
            id: tierList.id,
        },
    }).then( (response) => {
        if(response.length == 0){
            tierListToSave = formatTierList(tierList, true);
            saveTierList(res, tierListToSave);
        }
        else{
            tierListToUpdate = formatTierList(tierList, true);
            updateTierList(res, tierList);
        }
    }); 
});
/** PUT */
router.put('/:id', authenticateToken, (req, res) => {
    //Aquí hay que modificar para comprobar si ya existe y editar en vez de insertar en ese caso ^^
    let { id } = req.params;
    TierList.findAll({
        where: {
            id: id,
        },
    }).then( (response) => {
        if(response.length == 0){
            // Crear 
            let tierList = {
                id: id,
                ... req.body
            };
            tierListToSave = formatTierList(tierList, true);
            saveTierList(res, tierListToSave);
        }
        else{
            let tierList = response[0].dataValues;
            tierList = {
                ...tierList,
                ...req.body,
            };
            tierListToUpdate = formatTierList(tierList, true);
            updateTierList(res, tierList);
        }
    }); 
});

function saveTierList(res, newTierList) {
    TierList.create(newTierList).then((response) => {
        let createdTierList = formatTierList(response);
        res.status(201).send(createdTierList);
    });
}

function updateTierList(res, tierListToUpdate) {
    TierList.update(tierListToUpdate, {
        where: {
            id: tierListToUpdate.id,
        },
    }).then((numAffected) => {
        let updatedTierList = formatTierList(tierListToUpdate);
        res.status(200).send(updatedTierList);
    });
}

router.delete('/:id', authenticateToken, (req, res) => {
    let { id } = req.params;
    TierList.findAll({
        where: {
            id: id,
        },
    }).then( (response) => {
        if(response.length == 0){
            // No existe 
            res.status(400).send();
        }
        else{
            let deletedTierList = formatTierList(response[0].dataValues);
            TierList.destroy({
                where: {
                    id: id,
                },
            }).then( (response) => {
                res.status(200).send(deletedTierList);
            });
        }
    });
});

module.exports = router;
