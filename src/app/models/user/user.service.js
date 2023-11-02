const {
  getUserConversations,
} = require("../conversation/conversation.service");
const User = require("./user.model");

const findAllUserToDb = async (id) => {
  const users = await User.find({ _id: { $ne: id } });
  return users;
};

const createOrUpdateService = async (info) => {
  const updatedData = { ...info, isActive: true };
  const loginUser = await User.findOneAndUpdate({ id: info.id }, updatedData, {
    new: true,
    upsert: true,
  });
  const allUsers = await User.find({ id: { $ne: info.id } });
  const conversations = await getUserConversations(info.id);
  return { loginUser, allUsers, conversations };
};

module.exports = {
  findAllUserToDb,
  createOrUpdateService,
};
