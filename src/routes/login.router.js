const loginRouter = require('express').Router();
const loginController = require('../controller/login.controller');
const { allFields } = require('../middlewares');

loginRouter.post('/', allFields, loginController.signIn);

module.exports = loginRouter;