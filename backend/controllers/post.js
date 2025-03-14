const postsModel = require("../models/posts");

async function handleCreatePost(req, res) {
  try {
    return res.status(200).json({ message: "Successfully made post" });
  } catch (error) {
    return res.status(404).json({
      message: "You are wrong get a life",
    });
  }
}
async function handleEditPost(req, res) {
  try {
    return res.status(200).json({ message: "Successfully made post" });
  } catch (error) {
    return res.status(404).json({
      message: "You are wrong get a life",
    });
  }
}
async function handleDeletePost(req, res) {
  try {
    return res.status(200).json({ message: "Successfully made post" });
  } catch (error) {
    return res.status(404).json({
      message: "You are wrong get a life",
    });
  }
}
async function handleLikePost(req, res) {
  try {
    return res.status(200).json({ message: "Successfully made post" });
  } catch (error) {
    return res.status(404).json({
      message: "You are wrong get a life",
    });
  }
}
async function handleUnlikePost(req, res) {
  try {
    return res.status(200).json({ message: "Successfully made post" });
  } catch (error) {
    return res.status(404).json({
      message: "You are wrong get a life",
    });
  }
}
async function handleCommentOnPost(req, res) {
  try {
    return res.status(200).json({ message: "Successfully made post" });
  } catch (error) {
    return res.status(404).json({
      message: "You are wrong get a life",
    });
  }
}
async function handleDeleteComment(req, res) {
  try {
    return res.status(200).json({ message: "Successfully made post" });
  } catch (error) {
    return res.status(404).json({
      message: "You are wrong get a life",
    });
  }
}

module.exports = {
  handleCreatePost,
  handleEditPost,
  handleDeletePost,
  handleLikePost,
  handleUnlikePost,
  handleCommentOnPost,
  handleDeleteComment,
};
