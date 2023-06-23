const ApiError = require("../../../errors/ApiError");
const { createUserToDb, getUserById } = require("./auth.service");
const passport = require("passport");
const sendResponse = require("../../shared/sendResponse");
const generateToken = require("../../../utils/generateToken");
const env = require("../../../config");

const createUser = async (req, res, next) => {
  const userData = req.body;

  try {
    const response = await createUserToDb(userData);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User Create Sussessfully!",
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
      // res.setHeader("Access-Control-Allow-Origin", "*");
      // res.setHeader("Set-Cookie", `free_chat=${token}; Path=/;`);

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
      statusCode: 200,
      success: true,
      message: "user get successfully!",
      data: { user: loginUser },
    });
  } catch (error) {
    next(error);
  }
};

const userLoginWithGoogle = async (req, res, next) => {
  const { google_client_id, google_call_back_url, node_env } = env;

  try {
    const clientId = google_client_id;
    const callBackUrl =
      node_env !== "development"
        ? google_call_back_url
        : "http://localhost:5000/auth/callback";

    const authenticationURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${callBackUrl}&response_type=code&scope=email%20profile`;

    res.status(200).json({
      status: "success",
      message: "google auth url",
      data: authenticationURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  getLoginUser,
  userLoginWithGoogle,
};
