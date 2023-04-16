const blogPostRouter = require('express').Router();
const blogPostController = require('../controller/blogPost.controller');
const md = require('../middlewares');

blogPostRouter.post(
  '/post',
  md.tokenValidation,
  md.allFieldsPostBlogPost,
  blogPostController.postBlogPost,
);
blogPostRouter.get(
  '/post/search',
  md.tokenValidation,
  blogPostController.searchBlogPost,
);
blogPostRouter.get('/post', md.tokenValidation, blogPostController.getAllBlogPosts);
blogPostRouter.get('/post/:id', md.tokenValidation, blogPostController.getBlogPostById);
blogPostRouter.put(
  '/post/:id',
  md.tokenValidation,
  md.allFieldsPutBlogPost,
  md.sameUser,
  blogPostController.updateBlogPost,
);

module.exports = blogPostRouter;