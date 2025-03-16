const postsModel = require("../models/posts");

// Posts
async function handleCreatePost(req, res) {
  const { content } = req.body;
  const userId = req?.user?.userId;
  try {
    const newPost = await postsModel.create({
      userId,
      content,
    });
    return res.status(200).json({ message: "Successfully posted", newPost });
  } catch (error) {
    return res.status(404).json({
      message: "You were unable to create a new post",
    });
  }
}

async function handleGetPosts(req, res) {
  const userId = req?.user?.userId;
  // Get posts of a user
  try {
    const posts = await postsModel.find({ userId });
    return res
      .status(200)
      .json({ message: "Successfully got all posts", posts });
  } catch (error) {
    return res.status(404).json({
      message: "No posts exist for this user or user doesnt exist",
    });
  }
}
async function handleGetPost(req, res) {
  const postId = req?.params?.postId;
  try {
    const post = await postsModel.findOne({ _id: postId });
    return res.status(200).json({ message: "Successfully fetched post", post });
  } catch (error) {
    return res.status(404).json({
      message: "The post does not exist",
    });
  }
}

async function handleEditPost(req, res) {
  const postId = req?.params?.postId;
  const { content } = req?.body;

  try {
    const editedPost = await postsModel.findOneAndUpdate(
      { _id: postId },
      { content: content },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Successfully edited post", editedPost });
  } catch (error) {
    return res.status(404).json({
      message: "There was something wrong in editing post",
      error,
    });
  }
}

async function handleDeletePost(req, res) {
  const postId = req?.params?.postId;
  try {
    const deletedPost = await postsModel.findOneAndDelete({ _id: postId });
    if (!deletedPost) throw new Error("Such post does not exist");
    return res.status(200).json({ message: "Successfully deleted the post" });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to delete post",
      error: error.message,
    });
  }
}

// Like Unlike posts
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

// Comments
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
