const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { genarateToken } = require("../utils/token");

const saltRounds = 10;

exports.registerService = async (userInfo) => {
  const hasPassword = bcrypt.hashSync(userInfo.password, saltRounds);

  const newUser = {
    ...userInfo,
    password: hasPassword,
  };

  const user = await User.create(newUser);
  const token = await genarateToken(user);

  return token;
};
