const env = require("../../config");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const verifyUserToken = async (req, res, next) => {
  console.log(req.cookies);
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "user not login!",
      });
    }
    const decoded = await promisify(jwt.verify)(token, env.sectect_token);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUserToken;
