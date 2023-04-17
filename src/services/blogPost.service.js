const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');
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

const getAllBlogPosts = async () => {
  const allBlogPosts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
    ],
  });
  return allBlogPosts;
};

const getBlogPostById = async (id) => {
  const blogPostById = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
    ],
  });
  if (!blogPostById) return { statusNumber: 404, info: { message: 'Post does not exist' } };
  return { statusNumber: 200, info: blogPostById };
};

const sameUserChecker = async (blogPostId, token) => {
  const { id: userId } = decodeToken(token);
  const { statusNumber, info } = await getBlogPostById(blogPostId);
  if (statusNumber === 404) {
    const result = {
      itIsTheOwner: false,
      response: { statusNumber: 404, info: { message: 'Post does not exist' } },
    };
    return result;
  }
  const result = {
    itIsTheOwner: userId === info.dataValues.userId,
    response: { statusNumber: 401, info: { message: 'Unauthorized user' } },
  };
  return result;
};

const updateBlogPost = async (post, blogPostId, token) => {
  const { itIsTheOwner, response } = await sameUserChecker(blogPostId, token);
  if (!itIsTheOwner) {
    return response;
  }
  const { title, content } = post;
  await BlogPost.upsert({ id: +blogPostId, title, content });
  const { info: newInfo } = await getBlogPostById(blogPostId);
  return { statusNumber: 200, info: newInfo };
};

const searchBlogPost = async (search) => {
  const searchResult = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return { statusNumber: 200, info: searchResult };
};

const deletePost = async (blogPostId, token) => {
  const { itIsTheOwner, response } = await sameUserChecker(blogPostId, token);
  if (!itIsTheOwner) {
    return response;
  }
  await BlogPost.destroy({
    where: { id: blogPostId },
  });
  return { statusNumber: 204, info: null };
};

module.exports = {
  postBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  searchBlogPost,
  deletePost,
};
