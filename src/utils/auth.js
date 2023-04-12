const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
const configJWT = { algorithm: 'HS256' };

const newToken = (payload) => {
  const token = jwt.sign(payload, secretKey, configJWT);
  return token;
};

const validateToken = (token) => {
  const isTokenValid = jwt.verify(token, secretKey);
  return isTokenValid;  
};

const decodeToken = (token) => {
  const decodedToken = jwt.decode(token, secretKey);
  return decodedToken;
}

module.exports = {
  newToken,
  validateToken,
  decodeToken,
};
