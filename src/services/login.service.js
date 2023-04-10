const { User } = require('../models');

const signIn = async (email) => {
  const users = await User.findOne({
    where: { email }
  });
  console.log('User achado na service: ', users);

  if(!users) return { status: 400, response: { message: "Invalid fields" } };

  return users;
};

module.exports = {
  signIn
};
