const postsModel = require("../models/posts");
const likeModel = require("../models/likes");
const commentModel = require("../models/comment");
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

// Like / Unlike posts
async function handleLikePost(req, res) {
  const userId = req?.user?.userId;
  const postId = req?.params?.postId;

  try {
    await likeModel.create({ userId, postId });

    const likes = await likeModel.find({ postId: postId });

    const countLikes = likes?.length;

    const updatedPost = await postsModel.findOneAndUpdate(
      { _id: postId },
      { likesCount: countLikes },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Successfully liked post", postId: updatedPost });
  } catch (error) {
    return res.status(404).json({
      message: "There was a problem liking the post",
    });
  }
}

async function handleUnlikePost(req, res) {
  const userId = req?.user?.userId;

  const postId = req?.params?.postId;

  try {
    const deletedLike = await likeModel.findOneAndDelete({
      postId: postId,
      userId: userId,
    });
    console.log(deletedLike);

    const likes = await likeModel.find({ postId: postId });

    const countLikes = likes?.length;

    const updatedPost = await postsModel.findOneAndUpdate(
      { _id: postId },
      { likesCount: countLikes },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Successfully unliked post", updatedPost });
  } catch (error) {
    return res.status(404).json({
      message: "there was something wrong with unliking the post",
    });
  }
}

async function handleGetAllLikes(req, res) {
  // gets all likes on a post
  const postId = req?.params?.postId;

  try {
    const likes = await likeModel.find({ postId: postId });

    return res
      .status(200)
      .json({ message: "Successfully fetched likes", likes });
  } catch (error) {
    return res.status(404).json({
      message: "There was a problem fetching all likes",
    });
  }
}

// Comments
async function handleAddComment(req, res) {
  const userId = req?.user?.userId;
  const postId = req?.params?.postId;
  const { content } = req?.body;
  try {
    const comment = await commentModel.create({ userId, postId, content });
    return res
      .status(200)
      .json({ message: "Successfully added comment", comment });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to comment",
    });
  }
}
async function handleGetComments(req, res) {
  // gets all comments on a post
  const postId = req?.params?.postId;

  try {
    const allComments = await commentModel.find({ postId });
    return res
      .status(200)
      .json({ message: "Successfully got all comments", allComments });
  } catch (error) {
    return res.status(404).json({
      message: "Error getting comments",
    });
  }
}
async function handleDeleteComment(req, res) {
  const userId = req?.user?.userId;
  const postId = req?.params?.postId;
  const commentId = req?.params?.commentId;
  try {
    const deletedComment = await commentModel.findOneAndDelete({
      _id: commentId,
      postId,
      userId,
    });
    return res
      .status(200)
      .json({ message: "Successfully deleted comment", deletedComment });
  } catch (error) {
    return res.status(404).json({
      message: "Problem deleting comment",
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
  handleGetAllLikes,
};
