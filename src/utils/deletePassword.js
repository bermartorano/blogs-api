const deletePassword = (obj) => {
  const objCopy = { ...obj };
  delete objCopy.password;
  return objCopy;
}

module.exports = deletePassword;