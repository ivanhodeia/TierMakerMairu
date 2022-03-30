var express = require('express');
const jwt = require('jsonwebtoken');
const User = require ('../models/User');
const { generateAccessToken, authenticateToken } = require('../tokenController');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const SALT = "$2b$12$hkCkMPo1p2J8p5RR7bVVBu";
var router = express.Router();

/** GET USER INFO */
router.get('/profile', authenticateToken, (req, res) => {
    let status = 200;
    User.findAll({
        attributes: ['id', 'email'],
    }).then( (response) => {
        let user = response[0];
        if(!user){
            status = 400;
        }
        res.status(status).send(user);
    });
});
/** GET TOKEN */
router.post('/login', (req, res) => {
    let { email, password } = req.body;
    let status = 200;
    User.findAll({
        attributes: ['id', 'email', 'password'],
        where: {
            email: email,
        },
    }).then( (response) => {
        let user = response[0];
        let resultData;
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    let accessToken = generateAccessToken(email);
                    user = {
                        id: user.id,
                        email: user.email
                    };
                    resultData = {
                        accessToken: accessToken,
                        user: user
                    };
                }
                else{
                    status = 400;
                    resultData = {};
                }
                res.status(status).send(resultData);
            });
        }
        else{
            status = 400;
            resultData = {};
            res.status(status).send(resultData);
        }
    });
});

module.exports = router;
