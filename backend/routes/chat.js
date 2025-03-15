const express = require("express");

const {
  handleGetChat,
  handleGetChatMessage,
  handleGetChats,
  handleStartChat,
  handleSendMessage,
} = require("../controllers/chat");

const router = express.Router();

router.route("/").post(handleStartChat).get(handleGetChats);
router.route("/:chatId").get(handleGetChat);

router
  .route("/:chatId/messages")
  .post(handleSendMessage)
  .get(handleGetChatMessage);

module.exports = router;

// POST /api/chats → Start a chat
// GET /api/chats → Get user’s chats
// GET /api/chats/:chatId → Get a specific chat
// Message
// POST /api/chats/:chatId/messages → Send a message
// GET /api/chats/:chatId/messages → Get chat messages
