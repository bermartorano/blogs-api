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
userRouter.get('/user', md.tokenValidation, userController.getAllUsers);
userRouter.get('/user/:id', md.tokenValidation, userController.getOneUser);

module.exports = userRouter;
