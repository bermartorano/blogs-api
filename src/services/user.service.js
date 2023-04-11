const { User } = require('../models');
const { newToken } = require('../utils/auth');
const deletePassword = require('../utils/deletePassword');

const postUser = async (user) => {
  await User.create(user);
  const token = newToken(user.email);
  const result = { status: 201, info: { token } };
  return result;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll();
  const allUsersWithoutPassword = allUsers.map((user) => {
    const result = deletePassword(user.dataValues);
    return result;
  });
  return allUsersWithoutPassword;
};

const getOneUser = async (id) => {
  const user = await User.findOne({
    where: { id },
  });
  if (!user) return { status: 404, info: { message: 'User does not exist' } };
  return { status: 200, info: deletePassword(user.dataValues)};
};

module.exports = {
  postUser,
  getAllUsers,
  getOneUser,
};
