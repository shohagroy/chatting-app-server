const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  photoURL: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
