const dotenv = require('dotenv');

// get config vars
dotenv.config();
const jwt = require('jsonwebtoken');

function generateAccessToken(key) {
  return jwt.sign({id:key}, process.env.TOKEN_SECRET, { expiresIn: '1d' });
}

/** Middleware con Token */

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null){
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

    if (err){
      return res.sendStatus(403);
    }
    console.log("User-> ", user);
    req.user = user;

    next();
  })
}

/** Middleware sin Token */

// function authenticateToken(req, res, next){
//   next();
// }

module.exports = {generateAccessToken, authenticateToken};