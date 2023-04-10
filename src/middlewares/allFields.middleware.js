const allFields = (req, res, next) => {
  try {
    const { body: { email, password } } = req;
    if (!email || !password) return res.status(400).json({ message: "Some required fields are missing" })
  } catch (error) {
    return res.status(400).json({ message: "Some required fields are missing" });
  }
  return next();
};

module.exports = {
  allFields
};
