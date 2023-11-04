const sendResponse = require("../../shared/sendResponse");
const { createOrUpdateService, getAllUserService } = require("./user.service");

const getAllUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await getAllUserService(id);

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
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllUser,
  createOrUpdateUser,
};
