const { BlogPost, PostCategory, Category } = require('../models');
const { decodeToken } = require('../utils/auth');

const postBlogPost = async (post, token) => {
  const { title, content, categoryIds } = post;
  const { id: userId } = decodeToken(token);

  const categories = await Category.findAll();
  const allCategoriesExist = categories.every(({ dataValues: { id } }) => {
    const idMatch = categoryIds.includes(id);
    return idMatch;
  });

  if (!allCategoriesExist) throw new Error('one or more "categoryIds" not found');

  const blogPostReturn = await BlogPost.create({ title, content, userId });
  
  const { dataValues: { id } } = blogPostReturn;
  const createInPostCategory = categoryIds.map((category) => {
    const postCategoryInfo = { postId: id, categoryId: category };
    return postCategoryInfo;
  });

  await PostCategory.bulkCreate(createInPostCategory);

  return blogPostReturn;
};

module.exports = {
  postBlogPost,
};
