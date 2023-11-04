const sendResponse = require("../../shared/sendResponse");
const {
  postAConversationToDb,
  getUserConversations,
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
  const { id } = req.params;

  try {
    const response = await getUserConversations(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Conversations Get Successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAConversation,
  getUserConversation,
};
