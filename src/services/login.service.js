const { User } = require('../models');
const { newToken } = require('../utils/auth');

const signIn = async (email) => {
  const users = await User.findOne({
    where: { email }
  });
  if(!users) return { status: 400, response: { message: "Invalid fields" } };
  const token = newToken(email);
  const response = { status: 200, response: { token }};
  return response;
};

module.exports = {
  signIn
};
