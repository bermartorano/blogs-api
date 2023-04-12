const postService = require('../services/blogPost.service');

const postBlogPost = async (req, res) => {
  try {
    const { body, headers: { authorization } } = req;
    const postBlogPostReturn = await postService.postBlogPost(body, authorization);
    return res.status(201).json(postBlogPostReturn);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  postBlogPost,
};
