const userRouter = require('express').Router();
const userController = require('../controller/user.controller');
const md = require('../middlewares');

userRouter.post(
  '/user',
  md.displayNameSize,
  md.validEmail,
  md.validPassword,
  userController.postUser,
  );

module.exports = userRouter;
