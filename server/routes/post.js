const express = require("express");

const {
  handleCreatePost,
  handleEditPost,
  handleDeletePost,
  handleLikePost,

  handleUnlikePost,
  handleAddComment,

  handleGetPosts,
  handleGetPost,
  handleGetComments,
  handleGetAllLikes,
  handleDeleteComment,
} = require("../controllers/post");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads/posts");
    require("fs").mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "media-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
router
  .route("/")
  .post(upload.single("media"), handleCreatePost)
  .get(handleGetPosts);

router
  .route("/:postId")
  .get(handleGetPost)
  .put(handleEditPost)
  .delete(handleDeletePost);

// Like unlike
router.route("/:postId/likes").get(handleGetAllLikes);
router.route("/:postId/like").post(handleLikePost).delete(handleUnlikePost);

// Comments
router.route("/:postId/comments").get(handleGetComments).post(handleAddComment);

router.route("/:postId/comments/:commentId").delete(handleDeleteComment);

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
