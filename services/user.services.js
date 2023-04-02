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

  const createUser = await User.create(newUser);
  const token = await genarateToken(createUser);

  return { token, user: { email: createUser.email, _id: createUser._id } };
};

exports.loginService = async (user) => {
  const token = await genarateToken(user);
  return { token, user: { email: user.email, _id: user._id } };
};
