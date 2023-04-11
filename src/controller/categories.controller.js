const categoryService = require('../services/categories.service');

const postCategory = async (req, res) => {
  try {
    const { body: name } = req;
    const categoryPosted = await categoryService.postCategory(name);
    return res.status(201).json(categoryPosted);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postCategory,
};