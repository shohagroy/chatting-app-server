const sendResponse = require("../../shared/sendResponse");
const { findAllUserToDb } = require("./user.service");

const findAllUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await findAllUserToDb(id);

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
