const User = require("./user.model");

const findAllUserToDb = async (id) => {
  const users = await User.find({ _id: { $ne: id } });
  return users;
};

module.exports = {
  findAllUserToDb,
};
