const sendResponse = require("../../shared/sendResponse");
const {
  postAConversationToDb,
  getUserConversationToDb,
  getUsersAllConversationsToDb,
} = require("./conversation.service");

const postAConversation = async (req, res, next) => {
  const data = req.body;

  try {
    const response = await postAConversationToDb(data);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Message Send Successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getUserConversation = async (req, res, next) => {
  const { user, partner } = req.query;

  try {
    const response = await getUserConversationToDb(user, partner);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Conversations Received Successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getUserLastConversations = async (req, res, next) => {
  const { email } = req.params;

  try {
    const response = await getUsersAllConversationsToDb(email);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "last Message Received Successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAConversation,
  getUserConversation,
  getUserLastConversations,
};
