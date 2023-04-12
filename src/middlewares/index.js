const auth = require('../utils/auth');

const allFields = (req, res, next) => {
  const message = 'Some required fields are missing';
  try {
    const { body: { email, password } } = req;
    if (!email || !password) return res.status(400).json({ message });
  } catch (error) {
    return res.status(400).json({ message });
  }
  return next();
};

const displayNameSize = (req, res, next) => {
  const { body: { displayName: dp } } = req;
  if (dp.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  return next();
};

const validEmail = (req, res, next) => {
  const { body: { email } } = req;
  const format = email.includes('@');
  const emailBegging = email[0] !== '@';
  const emailEnd = email.substring(email.length - 4, email.length) === '.com';
  const valid = format && emailBegging && emailEnd;
  if (!valid) return res.status(400).json({ message: '"email" must be a valid email' });
  return next();
};

const validPassword = (req, res, next) => {
  const { body: { password } } = req;
  if (password.length < 6) {
    const message = '"password" length must be at least 6 characters long';
    return res.status(400).json({ message });
  }
  return next();
};

const tokenValidation = (req, res, next) => {
  const { headers: { authorization } } = req;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    auth.validateToken(authorization);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  return next();
};

const validateName = (req, res, next) => {
  const { body: { name } } = req;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
};

const allFieldsPostBlogPost = (req, res, next) => {
  const message = 'Some required fields are missing';
  try {
    const { body: { title, content, categoryIds } } = req;
    if (!title || !content || categoryIds.length === 0) return res.status(400).json({ message });
  } catch (error) {
    return res.status(400).json({ message });
  }
  return next();
};

module.exports = {
  allFields,
  displayNameSize,
  validEmail,
  validPassword,
  tokenValidation,
  validateName,
  allFieldsPostBlogPost,
};
