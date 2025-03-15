const express = require("express");
const {
  handleCreatePost,
  handleEditPost,
  handleDeletePost,
  handleLikePost,
  handleLikePost,
  handleUnlikePost,
  handleAddComment,

  handleGetPosts,
  handleGetPost,
  handleGetComments,
} = require("../controllers/post");

const router = express.Router();

router.route("/").post(handleCreatePost).get(handleGetPosts);
router
  .route("/posts/:postId")
  .get(handleGetPost)
  .put(handleEditPost)
  .delete(handleDeletePost);

// Like unlike
router.route("/:postId/likes").get();
router.route("/:postId/like").post(handleLikePost).delete(handleUnlikePost);

// Comments
router.route("/:postId/comments").get(handleGetComments).post(handleAddComment);

module.exports = router;

// POST /api/posts → Create a new post
// GET /api/posts → Get all posts
// GET /api/posts/:postId → Get a single post
// PUT /api/posts/:postId → Edit a post
// DELETE /api/posts/:postId → Delete a post

// Like Unlike
// POST /api/posts/:postId/like → Like a post
// DELETE /api/posts/:postId/like → Unlike a post
// GET /api/posts/:postId/likes → Get all likes for a post

// Comments
// POST /api/posts/:postId/comments → Add a comment

// GET /api/posts/:postId/comments → Get all comments on a post
