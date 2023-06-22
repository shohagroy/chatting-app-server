const User = require("./user.model");

const findAllUserToDb = async () => {
  const users = User.find();
  return users;
};

module.exports = {
  findAllUserToDb,
};
