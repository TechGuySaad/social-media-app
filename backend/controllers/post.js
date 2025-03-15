const postsModel = require("../models/posts");

async function handleGetPosts(req, res) {
  try {
    return res.status(200).json({ message: "Successfully made post" });
  } catch (error) {
    return res.status(404).json({
      message: "You are wrong get a life",
    });
  }
}
async function handleGetPost(req, res) {
  try {
    return res.status(200).json({ message: "Successfully made post" });
  } catch (error) {
    return res.status(404).json({
      message: "You are wrong get a life",
    });
  }
}
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
async function handleGetComments(req, res) {
  try {
    return res.status(200).json({ message: "Successfully made post" });
  } catch (error) {
    return res.status(404).json({
      message: "You are wrong get a life",
    });
  }
}
async function handleAddComment(req, res) {
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
  handleAddComment,
  handleDeleteComment,
  handleGetPosts,
  handleGetPost,
  handleGetComments,
};
