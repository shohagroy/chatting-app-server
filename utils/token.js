const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretJWT = process.env.JWT_SECRET_ACCESS_TOKEN;

module.exports.genarateToken = async (userInfo) => {
  const user = {
    email: userInfo.email,
    id: userInfo.id,
  };
  const token = await jwt.sign(user, secretJWT, {
    expiresIn: "1H",
  });

  console.log(token);

  return token;
};
