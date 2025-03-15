async function handleGetFollowers(req, res) {
  return res.status(200).json({ message: "successfully logged in" });
}
async function handleGetFollowing(req, res) {
  return res.status(200).json({ message: "successfully logged in" });
}
async function handleFollowUser(req, res) {
  return res.status(200).json({ message: "successfully logged in" });
}
async function handleUnfollowUser(req, res) {
  return res.status(200).json({ message: "successfully logged in" });
}

module.exports = {
  handleGetFollowers,
  handleGetFollowing,
  handleFollowUser,
  handleUnfollowUser,
};
