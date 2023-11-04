const Conversation = require("./conversation.model");

const postAConversationToDb = async (data) => {
  const result = await Conversation.create(data);
  return result;
};

const updateConversatonStatus = async (id) => {
  if (id) {
    const updatedData = { isNotSeen: false };
    const result = await Conversation.findByIdAndUpdate(id, updatedData);

    return result;
  }

  return false;
};

const getUserConversations = async (userId) => {
  const userConversations = await Conversation.find({
    participants: { $regex: new RegExp(userId, "i") },
  }).sort({
    createdAt: 1,
  });

  const findLastConversations = (conversations, loginUser) => {
    const lastConversationsMap = new Map();
    for (const conversation of conversations) {
      const participants = conversation.participants.split("-");

      if (participants.includes(loginUser.id)) {
        const otherUserId = participants.find(
          (userId) => userId !== loginUser.id
        );

        if (lastConversationsMap.has(otherUserId)) {
          const lastConversation = lastConversationsMap.get(otherUserId);
          if (
            new Date(conversation.createdAt) >
            new Date(lastConversation.createdAt)
          ) {
            lastConversationsMap.set(otherUserId, conversation);
          }
        } else {
          lastConversationsMap.set(otherUserId, conversation);
        }
      }
    }

    const lastConversations = Array.from(lastConversationsMap.values()).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return lastConversations;
  };

  const lastConversations = findLastConversations(userConversations, {
    id: userId,
  });

  return { lastConversations, userConversations };
};

module.exports = {
  postAConversationToDb,
  getUserConversations,
  updateConversatonStatus,
};
