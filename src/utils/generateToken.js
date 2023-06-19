const jwt = require("jsonwebtoken");
const env = require("../config");

const generateToken = (userInfo) => {
  const { firstName, email, _id } = userInfo;
  const payload = {
    firstName,
    email,
    _id,
  };

  const token = jwt.sign(payload, env.sectect_token, {
    expiresIn: "24H",
  });

  return token;
};

module.exports = generateToken;
