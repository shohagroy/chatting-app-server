const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Provide a valid Email"],
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    // validate: {
    //   validator: (value) =>
    //     validator.isStrongPassword(value, {
    //       minLength: 6,
    //       minLowercase: 3,
    //       minNumbers: 1,
    //       minUppercase: 1,
    //       minSymbols: 1,
    //     }),
    //   message: "Password {VALUE} is not strong enough.",
    // },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
