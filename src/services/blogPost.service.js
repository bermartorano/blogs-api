const { BlogPost, PostCategory } = require('../models');
const { decodeToken } = require('../utils/auth');

const postBlogPost = async (post, token) => {
  const { title, content, categoryIds } = post;
  const { id: userId } = decodeToken(token);
  const blogPostReturn = await BlogPost.create({ title, content, userId });
  console.log('RETORNO DO POST: ', blogPostReturn);
  
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
