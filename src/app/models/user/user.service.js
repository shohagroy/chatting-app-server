const User = require("./user.model");

const findAllUserToDb = async () => {
  const users = User.find();
  return users;
};

const getUserConversations = async (email, partner) => {
  const user = await User.findOne({ email: partner });
  return user;
};

module.exports = {
  findAllUserToDb,
  getUserConversations,
};
