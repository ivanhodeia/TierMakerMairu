var express = require('express');
const { authenticateToken } = require('../tokenController');
var router = express.Router();
const PICTURES = [
    {
        category: 'custom',
        picture: "https://robohash.org/1d",
    },
    {
        category: 'custom',
        picture: "https://robohash.org/1d1",
    },
    {
        category: 'custom',
        picture: "https://robohash.org/1d3",
    },
    {
        category: 'custom',
        picture: "https://robohash.org/1d4",
    },
    {
        category: 'custom',
        picture: "https://robohash.org/1d5",
    },
    {
        category: 'custom',
        picture: "https://robohash.org/1d6",
    },
    {
        category: 'custom',
        picture: "https://robohash.org/1d7",
    },
    {
        category: 'custom',
        picture: "https://robohash.org/1d8",
    },
    {
        category: 'custom',
        picture: "https://robohash.org/1d9",
    },
    {
        category: 'custom',
        picture: "https://robohash.org/1d10",
    },
    {
        category: 'custom',
        picture: "https://robohash.org/2d",
    },
    {
        category: 'robots',
        picture: "https://robohash.org/2d1",
    },
    {
        category: 'robots',
        picture: "https://robohash.org/2d3",
    },
    {
        category: 'robots',
        picture: "https://robohash.org/2d4",
    },
    {
        category: 'robots',
        picture: "https://robohash.org/2d5",
    },
    {
        category: 'robots',
        picture: "https://robohash.org/2d6",
    },
    {
        category: 'custom',
        picture: "https://robohash.org/2d7",
    },
    {
        category: 'custom',
        picture: "https://robohash.org/2d8",
    },
    {
        category: 'custom',
        picture: "https://robohash.org/2d9",
    },
    {
        category: 'custom',
        picture: "https://robohash.org/2d10",
    },
];

router.get('/:category', authenticateToken, (req, res) => {
    let { category } = req.params;
    let { _limit, _start } = req.query;
    if(category == 'undefined'){
        category = undefined;
    }
    if(_limit == 'undefined'){
        _limit = undefined;
    }
    if(_start == 'undefined'){
        _start = undefined;
    }
    console.log("Params-> ", req.query);
    let pictures = [];
    if(!_limit){
        _limit = -1;
    }
    if(!_start){
        _start = 0;
    }
    if(_limit > _start){
        _limit -= _start;
    }
    PICTURES.forEach( (pictureInfo) => {
        if(!category || category == 'random' || pictureInfo.category == category){
            if(_limit == -1 || pictures.length < _limit){
                pictures.push(pictureInfo.picture);
            }
        }
    })
    res.status(200).send(pictures);
});

module.exports = router;
