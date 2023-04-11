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

const getAllUsers = async (_req, res) => {
  try {
    const allUsers = await userServices.getAllUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { params: { id } } = req;
    const user = await userServices.getOneUser(id);
    return res.status(user.status).json(user.info);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  postUser,
  getAllUsers,
  getOneUser,
};
