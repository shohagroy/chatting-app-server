const ApiError = require("../../../errors/ApiError");
const { createUserToDb, getUserById } = require("./auth.service");
const passport = require("passport");
const sendResponse = require("../../shared/sendResponse");
const generateToken = require("../../../utils/generateToken");

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

const loginUser = async (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      throw new ApiError(401, "Email or Password Incorrect!");
    }

    req.logIn(user, (err) => {
      if (err) {
        throw new ApiError(400, "Something went Wrong!");
      }

      const token = generateToken(user);

      user.password = "";
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Set-Cookie", `free_chat=${token}; Path=/;`);

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Login successfully!",
        data: { user, token },
      });
    });
  })(req, res, next);
};

const getLoginUser = async (req, res, next) => {
  const user = req.user;

  try {
    const loginUser = await getUserById(user?._id);
    res.status(200).json({
      status: "success",
      message: "user get successfully!",
      data: { user: loginUser },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  getLoginUser,
};
