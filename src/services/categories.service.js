const { Category } = require('../models');

const postCategory = async (nameObj) => {
  const categoryPosted = await Category.create(nameObj);
  const result = categoryPosted.dataValues;
  return result;
};

module.exports = {
  postCategory,
};
