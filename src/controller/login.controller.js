const loginServices = require('../services/login.service');

const signIn = async (req, res) => {
  try {
    const { body: { email, password } } = req;
    const login = await loginServices.signIn(email, password);
    return res.status(login.status).json(login.response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signIn,
};
