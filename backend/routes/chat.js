const express = require("express");

const {
  handleGetChat,
  handleGetChatMessage,
  handleGetChats,
  handleStartChat,
  handleSendMessageOffline,
} = require("../controllers/chat");

const router = express.Router();

router.route("/").get(handleGetChats).post(handleStartChat);
router.route("/:chatId").get(handleGetChat).post(handleSendMessageOffline);

router.route("/:chatId/:messageId").get(handleGetChatMessage);
// .post(handleSendMessage)

module.exports = router;

// GET /api/chats → Get user’s chats
// POST /api/chats → Start a chat
// GET /api/chats/:chatId → Get a specific chat
// Message
// POST /api/chats/:chatId/messages → Send a message
// GET /api/chats/:chatId/messages → Get chat messages
