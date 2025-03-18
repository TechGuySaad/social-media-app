const chatModel = require("../models/chat");
const messageModel = require("../models/messages");

async function handleGetChats(req, res) {
  try {
    if (!req.user?.userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const chats = await chatModel.find({
      $or: [{ user1: req.user.userId }, { user2: req.user.userId }],
    });

    return res.status(200).json({
      message: "Chats retrieved successfully",
      userId: req.user.userId,
      email: req.user?.email,
      chats,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving chats", error });
  }
}

async function handleGetChat(req, res) {
  try {
    const chatId = req.params.chatId;
    if (!chatId)
      return res.status(400).json({ message: "Chat ID is required" });

    const chat = await chatModel.findOne({ _id: chatId });
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const messages = await messageModel.find({
      $or: [
        { senderId: chat.user1, receiverId: chat.user2 },
        { senderId: chat.user2, receiverId: chat.user1 },
      ],
    });

    return res.status(200).json({
      message: "Chat and messages retrieved successfully",
      chat,
      messages,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving chat", error });
  }
}

async function handleStartChat(req, res) {
  try {
    const userId = req.user?.userId;
    const receiver = req.body?.receiver;

    if (!userId || !receiver) {
      return res
        .status(400)
        .json({ message: "Both user and receiver are required" });
    }

    const chat = await chatModel.findOne({
      $or: [
        { user1: userId, user2: receiver },
        { user1: receiver, user2: userId },
      ],
    });

    if (chat)
      return res.status(409).json({ message: "Chat already exists", chat });

    const newChat = await chatModel.create({ user1: userId, user2: receiver });

    return res.status(201).json({
      message: "Chat started successfully",
      newChat,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error starting chat", error });
  }
}

async function handleGetChatMessage(req, res) {
  try {
    const { chatId, messageId } = req.params;

    if (!chatId || !messageId) {
      return res
        .status(400)
        .json({ message: "Chat ID and Message ID are required" });
    }

    const message = await messageModel.findOne({ _id: messageId, chatId });

    if (!message) return res.status(404).json({ message: "Message not found" });

    return res.status(200).json({
      message: "Message retrieved successfully",
      message,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving message", error });
  }
}

async function handleSendMessageOffline(req, res) {
  try {
    const chatId = req.params.chatId;
    const senderId = req.user?.userId;
    const { receiverId, content } = req.body;

    if (!chatId || !senderId || !receiverId || !content) {
      return res
        .status(400)
        .json({
          message:
            "All fields (chatId, senderId, receiverId, content) are required",
        });
    }

    const message = await messageModel.create({
      chatId,
      senderId,
      receiverId,
      content,
    });

    return res.status(201).json({
      message: "Message sent successfully",
      message,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error sending message", error });
  }
}

module.exports = {
  handleGetChat,
  handleGetChatMessage,
  handleGetChats,
  handleStartChat,
  handleSendMessageOffline,
};
