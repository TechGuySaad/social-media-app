const express = require("express");
const {
  handleGetFollowers,
  handleGetFollowing,
  handleFollowUser,
  handleUnfollowUser,
} = require("../controllers/follow");

const router = express.Router();

router
  .route("/:userId/follow")
  .post(handleFollowUser)
  .delete(handleUnfollowUser);
router.route("/:userId/followers").get(handleGetFollowers);
router.route("/:userId/following").get(handleGetFollowing);

module.exports = router;

// POST /api/users/:userId/follow → Follow a user
// DELETE /api/users/:userId/unfollow → Unfollow a user
// GET /api/users/:userId/followers → Get followers list
// GET /api/users/:userId/following → Get following list
