const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
const configJWT = { algorithm: 'HS256' };

const newToken = (payload) => {
  const token = jwt.sign(payload, secretKey, configJWT);
  return token;
};

module.exports = {
  newToken,
};
