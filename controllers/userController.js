const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const { registerService, loginService } = require("../services/user.services");

exports.register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(403).json({
        status: "faild",
        message: "user already exists!",
      });
    } else {
      const response = await registerService(req.body);

      res.status(201).json({
        status: "success",
        message: "user create successfull!",
        token: response.token,
        user: response.user,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const loginInfo = req.body;

    const user = await User.findOne({ email: loginInfo.email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }

    const isCorrectPassword = await bcrypt.compare(
      loginInfo.password,
      user.password
    );

    if (!isCorrectPassword) {
      return res.status(401).json({
        status: "fail",
        error: "incorrect password!",
      });
    }

    const response = await loginService(user);

    res.status(201).json({
      status: "success",
      message: "login successfull!",
      token: response.token,
      user: response.user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
