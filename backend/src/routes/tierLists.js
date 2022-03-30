var express = require('express');
const TierList = require ('../models/TierList');
var router = express.Router();

/** GET ALL */
router.get('/', (req, res) => {
    let status = 200;
    TierList.findAll().then( (response) => {
        let tierLists = response.map( (tierListInfo) => {
            return formatTierList(tierListInfo);
        });
        res.status(status).send({data: tierLists});
    });
});
/** GET ONE */
router.get('/:id', (req, res) => {
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
        res.status(status).send({data: tierList});
    });
});
/** PUT */
router.put('/:id', (req, res) => {
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
        res.status(201).send({data: createdTierList});
    });
}

function updateTierList(res, tierListToUpdate) {
    TierList.update(tierListToUpdate, {
        where: {
            id: tierListToUpdate.id,
        },
    }).then((numAffected) => {
        let updatedTierList = formatTierList(tierListToUpdate);
        res.status(200).send({data: updatedTierList});
    });
}

router.delete('/:id', (req, res) => {
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
                res.status(200).send({
                    data: deletedTierList,
                });
            });
        }
    });
});

function formatTierList(tierList, isSave = false) {
    if(isSave){
        tierList.tiers = JSON.stringify(tierList.tiers);
        tierList.unassignedImages = JSON.stringify(tierList.unassignedImages);
    }
    else{
        tierList.tiers = JSON.parse(tierList.tiers);
        tierList.unassignedImages = JSON.parse(tierList.unassignedImages);
    }
    return tierList;
}

module.exports = router;
