async function handleGetNotifications(req, res) {
  return res.status(200).json({ message: "It was a success" });
}
async function handleMarkAsRead(req, res) {
  return res.status(200).json({ message: "It was a success" });
}
async function handleDeleteNotification(req, res) {
  return res.status(200).json({ message: "It was a success" });
}

module.exports = {
  handleGetNotifications,
  handleDeleteNotification,
  handleMarkAsRead,
};
