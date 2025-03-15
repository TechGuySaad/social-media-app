async function handleGetChat(req, res) {
  return res.status.json({ message: "successfully done" });
}
async function handleGetChatMessage(req, res) {
  return res.status.json({ message: "successfully done" });
}
async function handleGetChats(req, res) {
  return res.status.json({ message: "successfully done" });
}
async function handleStartChat(req, res) {
  return res.status.json({ message: "successfully done" });
}
async function handleSendMessage(req, res) {
  return res.status.json({ message: "successfully done" });
}

module.exports = {
  handleGetChat,
  handleGetChatMessage,
  handleGetChats,
  handleStartChat,
  handleSendMessage,
};
