const { Category } = require('../models');

const postCategory = async (nameObj) => {
  const categoryPosted = await Category.create(nameObj);
  const result = categoryPosted.dataValues;
  return result;
};

const getAllCategories = async () => {
  const queryResult = await Category.findAll();
  return queryResult;
};

module.exports = {
  postCategory,
  getAllCategories,
};
