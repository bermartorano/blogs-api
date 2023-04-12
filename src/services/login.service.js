const { User } = require('../models');
const { newToken } = require('../utils/auth');

const signIn = async (email) => {
  const user = await User.findOne({
    where: { email },
  });
  if (!user) return { status: 400, response: { message: 'Invalid fields' } };
  const { dataValues: { id } } = user;
  const token = newToken({ id });
  const response = { status: 200, response: { token } };
  return response;
};

module.exports = {
  signIn,
};
