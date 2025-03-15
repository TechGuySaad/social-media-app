const express = require("express");
const {
  handleGetFollowers,
  handleGetFollowing,
  handleFollowUser,
  handleUnfollowUser,
} = require("../controllers/follow");

const router = express.Router();

router.route("/followers").get(handleGetFollowers);
router.route("/following").get(handleGetFollowing);
router.route("/follow").post(handleFollowUser);
router.route("/unfollow").delete(handleUnfollowUser);

module.exports = router;

// POST /api/users/:userId/follow → Follow a user
// DELETE /api/users/:userId/unfollow → Unfollow a user
// GET /api/users/:userId/followers → Get followers list
// GET /api/users/:userId/following → Get following list
