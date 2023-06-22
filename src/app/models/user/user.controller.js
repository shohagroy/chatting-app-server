const sendResponse = require("../../shared/sendResponse");
const { findAllUserToDb, getUserConversations } = require("./user.service");

const findAllUser = async (req, res, next) => {
  try {
    const response = await findAllUserToDb();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Received Successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getUserMessages = async (req, res, next) => {
  const { user, partner } = req.query;

  try {
    const response = await getUserConversations(user, partner);

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
module.exports = {
  findAllUser,
  getUserMessages,
};
