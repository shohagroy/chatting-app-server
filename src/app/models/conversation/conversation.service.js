const User = require("../user/user.model");
const Conversation = require("./conversation.model");

const postAConversationToDb = async (data) => {
  const result = await Conversation.create(data);
  return result;
};

const getUserConversationToDb = async (user, partner) => {
  const conversationPartner = await User.findOne({ email: partner });

  const query1 = `${user}-${partner}`;
  const query2 = `${partner}-${user}`;

  const result = await Conversation.find({
    $or: [{ participants: query1 }, { participants: query2 }],
  }).sort({
    createdAt: 1,
  });

  return {
    partner: conversationPartner,
    conversations: result,
  };
};

module.exports = {
  postAConversationToDb,
  getUserConversationToDb,
};
