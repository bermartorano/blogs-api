const categoryRouter = require('express').Router();
const categoryController = require('../controller/categories.controller');
const md = require('../middlewares');

categoryRouter.post(
  '/categories',
  md.validateName,
  md.tokenValidation,
  categoryController.postCategory,
);

categoryRouter.get('/categories', md.tokenValidation, categoryController.getAllCategories);
// categoryRouter.get('/categories', categoryController.getAllCategories);

module.exports = categoryRouter;