const sendResponse = require("../../shared/sendResponse");
const { findAllUserToDb, createOrUpdateService } = require("./user.service");

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

const createOrUpdateUser = async (req, res, next) => {
  const info = req.body;
  try {
    const response = await createOrUpdateService(info);
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
  createOrUpdateUser,
};
