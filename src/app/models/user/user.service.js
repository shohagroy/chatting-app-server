const {
  getUserConversations,
} = require("../conversation/conversation.service");
const User = require("./user.model");

const findAllUserToDb = async (id) => {
  const users = await User.find({ _id: { $ne: id } });
  return users;
};

const createOrUpdateService = async (info) => {
  try {
    const loginUser = await User.findOneAndUpdate({ id: info.id }, info, {
      new: true,
      upsert: true,
    });
    const allUsers = await User.find({ id: { $ne: info.id } });
    const { userConversations, lastConversations } = await getUserConversations(
      info.id
    );
    return { loginUser, allUsers, userConversations, lastConversations };
  } catch (error) {
    console.log(error);
  }
};

const updateActiveStatus = async (activeUsers, info) => {
  // console.log(activeUsers, "call");
  // try {
  //   const user = await User.findByIdAndUpdate(userId, info, { new: true });
  //   return user;
  // } catch (error) {
  //   console.log(error);
  //   // Handle the error appropriately, e.g., return an error response
  // }
};

module.exports = {
  findAllUserToDb,
  createOrUpdateService,
  updateActiveStatus,
};
