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
  next();
};

module.exports = {
  allFields,
  displayNameSize,
  validEmail,
  validPassword,
};
