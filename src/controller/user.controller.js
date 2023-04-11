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

module.exports = {
  postUser,
};
