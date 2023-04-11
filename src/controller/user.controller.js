const userServices = require('../services/user.service');

const postUser = async (req, res) => {
  try {
    const { body } = req;
    const postUserReturn = await userServices.postUser(body);
    return res.status(postUserReturn.status).json(postUserReturn.info);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'User already registered' });
    }
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userServices.getAllUsers();
    return res.status(200).json(allUsers);
  } catch (error) {

  }
};

module.exports = {
  postUser,
  getAllUsers,
};
