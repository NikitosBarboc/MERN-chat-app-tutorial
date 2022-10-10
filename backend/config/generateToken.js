const jwt = require('jsonwebtoken');
const {jwtSecret} = require('./default.json')

const generateToken = (id) => {
  return jwt.sign({id}, jwtSecret, {
    expiresIn: "1h"
  });
}

module.exports = generateToken;
