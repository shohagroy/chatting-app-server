const ApiError = require("../../../errors/ApiError");
const { createUserToDb } = require("./auth.service");
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

module.exports = {
  createUser,
  loginUser,
};
