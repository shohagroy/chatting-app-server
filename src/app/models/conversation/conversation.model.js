const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    participants: {
      type: String,
      required: true,
    },
    users: [],

    message: {
      type: String,

      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
