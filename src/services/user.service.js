const { User } = require('../models');
const { newToken } = require('../utils/auth');

const postUser = async (user) => {
  await User.create(user);
  const token = newToken(user.email);
  const result = { status: 201, info: { token } };
  return result;
};

module.exports = {
  postUser,
};

