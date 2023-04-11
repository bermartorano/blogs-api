const categoryRouter = require('express').Router();
const categoryController = require('../controller/categories.controller');
const md = require('../middlewares');

categoryRouter.post(
  '/categories',
  md.validateName,
  md.tokenValidation,
  categoryController.postCategory,
);

module.exports = categoryRouter;