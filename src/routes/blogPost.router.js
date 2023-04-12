const blogPostRouter = require('express').Router();
const blogPostController = require('../controller/blogPost.controller');
const md = require('../middlewares');

blogPostRouter.post(
  '/post',
  md.tokenValidation,
  md.allFieldsPostBlogPost,
  blogPostController.postBlogPost,
);

module.exports = blogPostRouter;