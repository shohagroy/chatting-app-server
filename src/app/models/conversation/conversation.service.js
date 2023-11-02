const User = require("../user/user.model");
const Conversation = require("./conversation.model");

const postAConversationToDb = async (data) => {
  const result = await Conversation.create(data);
  return result;
};

//
const updateNotSeen = async (id) => {
  const result = await Conversation.findOneAndUpdate(
    { conversationId: id },
    { isNotSeen: true },
    {
      new: true,
      upsert: true,
    }
  );
  return result;
};

const updateIsSeen = async (id) => {
  const result = await Conversation.updateMany(
    { participants: id },
    { isNotSeen: false },
    {
      new: true,
    }
  );
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

const getUserConversations = async (userId) => {
  const userConversations = await Conversation.find({
    participants: { $regex: new RegExp(userId, "i") },
  }).sort({
    createdAt: 1,
  });

  // return result;

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

  return {
    userConversations,
    lastConversations,
  };

  // return result;
};

const getUsersAllConversationsToDb = async (userEmail) => {
  const lastConversations = [];
  const userPairs = [];

  // Fetch all conversations for the user's email
  const conversations = await Conversation.find({
    participants: { $regex: new RegExp(userEmail, "i") },
  }).lean();

  // Extract unique user pairs from conversations
  for (const conversation of conversations) {
    const participants = conversation.participants;
    const pair = participants.split("-");
    if (pair.length === 2 && pair.includes(userEmail)) {
      const otherUser = pair.find((email) => email !== userEmail);
      const userPair = `${userEmail}-${otherUser}`;
      const reversedPair = `${otherUser}-${userEmail}`;
      if (!userPairs.includes(userPair) && !userPairs.includes(reversedPair)) {
        userPairs.push(userPair);
      }
    }
  }

  for (const userPair of userPairs) {
    const participants = [userPair, userPair.split("-").reverse().join("-")];
    const conversation = conversations
      .filter((c) => participants.includes(c.participants))
      .sort((a, b) => b.createdAt - a.createdAt)[0];

    if (conversation) {
      lastConversations.push(conversation);
    }
  }

  return lastConversations.sort((a, b) => b.createdAt - a.createdAt);
};

module.exports = {
  postAConversationToDb,
  getUserConversationToDb,
  getUsersAllConversationsToDb,
  getUserConversations,
  updateNotSeen,
  updateIsSeen,
};
