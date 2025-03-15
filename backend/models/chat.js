const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    lastMessageId: { type: mongoose.Schema.Types.ObjectId, ref: "messages" },
  },
  { timestamps: true }
);

const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel;

// 5. Chat Collection
// Manages conversations between users.

// chatId
// lastMessageId
// // updatedAt
