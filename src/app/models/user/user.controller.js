const sendResponse = require("../../shared/sendResponse");
const { findAllUserToDb } = require("./user.service");

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

module.exports = {
  findAllUser,
};
