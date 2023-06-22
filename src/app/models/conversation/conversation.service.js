const User = require("../user/user.model");
const Conversation = require("./conversation.model");

const postAConversationToDb = async (data) => {
  const result = await Conversation.create(data);
  return result;
};

const getUserConversationToDb = async (user, partner) => {
  const conversationPartner = await User.findOne({ email: partner });
  const result = await Conversation.find({});

  return {
    partner: conversationPartner,
    conversations: result,
  };
};

module.exports = {
  postAConversationToDb,
  getUserConversationToDb,
};
