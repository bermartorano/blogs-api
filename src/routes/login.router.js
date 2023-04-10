const loginRouter = require('express').Router();
const loginController = require('../controller/login.controller');
const { allFields } = require('../middlewares/allFields.middleware');

loginRouter.post('/', allFields, loginController.signIn);

module.exports = loginRouter;