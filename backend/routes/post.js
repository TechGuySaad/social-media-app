const express = require("express");
const {
  handleCreatePost,
  handleEditPost,
  handleDeletePost,
  handleLikePost,
  handleLikePost,
  handleUnlikePost,
  handleCommentOnPost,
  handleDeleteComment,
  handleGetPosts,
} = require("../controllers/post");

const router = express.Router();

// Create Post and get posts

router.route("/").get(handleGetPosts).post(handleCreatePost);

// Delete post and Edit Post Description

router.route("/:postId").post(handleEditPost).delete(handleDeletePost);

// Like/Unlike/Comment on post

router.route("/:postId/like").post(handleLikePost);
router.route("/:postId/unlike").post(handleUnlikePost);
router
  .route("/:postId/comment")
  .post(handleCommentOnPost)
  .delete(handleDeleteComment);

module.exports = { router };
