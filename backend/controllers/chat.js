const chatModel = require("../models/chat");
const messageModel = require("../models/messages");

async function handleGetChats(req, res) {
  const chats = await chatModel.find({
    $or: [{ user1: req.user.userId }, { user2: req.user.userId }],
  });
  console.log(chats);

  return res.json({
    message: "successfully done",
    userId: req.user?.userId,
    email: req.user?.email,
    chats,
  });
}

async function handleGetChat(req, res) {
  const chatId = req.params.chatId;
  const chat = await chatModel.findOne({ _id: chatId });
  const messages = await messageModel.find({
    $or: [
      {
        senderId: chat.user1,
        receiverId: chat.user2,
      },
      { senderId: chat.user2, receiverId: chat.user1 },
    ],
  });
  return res.json({
    message: "successfully got chat and all its messages",
    chat,
    messages,
  });
}

async function handleStartChat(req, res) {
  const chat = await chatModel.findOne({
    $or: [
      {
        user1: req.user.userId,
        user2: req.body?.receiver,
      },
      { user1: req.body?.receiver, user2: req.user.userId },
    ],
  });

  if (chat)
    return res.status(404).json({ message: "Chat already exists", chat });

  const newChat = await chatModel.create({
    user1: req.user.userId,
    user2: req.body?.receiver,
  });

  return res
    .status(201)
    .json({ message: "successfully started new chat", newChat });
}

async function handleGetChatMessage(req, res) {
  const chatId = req.params.chatId;
  const messageId = req.params.messageId;
  const message = await messageModel.findOne({
    _id: messageId,
    chatId: chatId,
  });

  return res.json({ message: "successfully got chat message", message });
}
async function handleSendMessageOffline(req, res) {
  const chatId = req.params.chatId;
  const senderId = req.user.userId;
  const { receiverId, content } = req.body;
  console.log(senderId, receiverId, content, chatId);

  const message = await messageModel.create({
    chatId,
    senderId,
    receiverId,
    content,
  });
  return res
    .status(200)
    .json({ message: "successfully sent message", message });
}
module.exports = {
  handleGetChat,
  handleGetChatMessage,
  handleGetChats,
  handleStartChat,
  handleSendMessageOffline,
};
