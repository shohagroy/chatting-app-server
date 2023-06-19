const ApiError = require("../../../errors/ApiError");
const { createUserToDb } = require("./auth.service");

const createUser = async (req, res, next) => {
  const userData = req.body;

  try {
    const response = await createUserToDb(userData);

    res.status(201).json({
      status: true,
      message: "user create sussessfully!",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
};
