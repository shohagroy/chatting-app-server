const ApiError = require("../../../errors/ApiError");
const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../../../utils/generateToken");

const createUserToDb = async (userData) => {
  const { email, password } = userData;

  const alreadyRegistered = await User.findOne({ email: email });

  if (!alreadyRegistered) {
    const newUser = {
      firstName: "",
      lastName: "",
      avatar: "",
      email: email,
      password: bcrypt.hashSync(password, 10),
    };

    const createUser = await User.create(newUser);

    const token = await generateToken(createUser);
    return token;
  } else {
    throw new ApiError(400, "Email is Already Registered!");
  }
};

module.exports = {
  createUserToDb,
};
