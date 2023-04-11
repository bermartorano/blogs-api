const { User } = require('../models');
const { newToken } = require('../utils/auth');

const postUser = async (user) => {
  await User.create(user);
  const token = newToken(user.email);
  const result = { status: 201, info: { token } };
  return result;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll();
  const allUsersWithoutPassword = allUsers.map((user) => {
    const userCopy = { ...user.dataValues };
    delete userCopy.password;
    return userCopy;
  });
  return allUsersWithoutPassword;
};

module.exports = {
  postUser,
  getAllUsers,
};
