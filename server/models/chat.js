const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    lastMessageId: { type: mongoose.Schema.Types.ObjectId, ref: "messages" },
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure the combination of user1 and user2 is unique
chatSchema.index({ user1: 1, user2: 1 }, { unique: true });

const ChatModel = mongoose.model("chat", chatSchema);

module.exports = ChatModel;
