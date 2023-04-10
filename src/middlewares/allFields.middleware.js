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

module.exports = {
  allFields,
};
