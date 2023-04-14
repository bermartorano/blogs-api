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

const getAllBlogPosts = async (req, res) => {
  try {
    const allBlogPosts = await postService.getAllBlogPosts();
    return res.status(200).json(allBlogPosts);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const { params: { id } } = req;
    const { statusNumber, info } = await postService.getBlogPostById(id);
    return res.status(statusNumber).json(info);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const { body, params: { id }, headers: { authorization } } = req;
    const { statusNumber, info } = await postService.updateBlogPost(body, id, authorization);
    console.log('STATUS: ', statusNumber);
    console.log('INFO: ', info);
    return res.status(statusNumber).json(info);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
};
