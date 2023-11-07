const sendResponse = require("../../shared/sendResponse");
const {
  postAConversationToDb,
  getUserConversations,
  userLastConversations,
  participantsConversations,
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

const getLastConversations = async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await userLastConversations(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Last Conversations Get Successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getParticipantsConversations = async (req, res, next) => {
  const { query } = req.query;

  const queryOne = query;
  const queryTwo = query.split("-").reverse().join("-");

  try {
    const response = await participantsConversations(queryOne, queryTwo);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Participants Conversations Get Successfully",
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
  getLastConversations,
  getParticipantsConversations,
};
