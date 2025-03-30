const followModel = require("../models/follows");
const userModel = require("../models/user");

async function handleFollowUser(req, res) {
  try {
    const followerId = req.user?.userId;
    const followingId = req.params?.userId;

    if (!followerId || !followingId) {
      return res
        .status(400)
        .json({ message: "Invalid follower or following ID" });
    }

    if (followerId === followingId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const followedBefore = await followModel.findOne({
      followerId,
      followingId,
    });
    if (followedBefore) {
      return res.status(409).json({ message: "User already followed" });
    }

    const follow = await followModel.create({ followerId, followingId });
    return res
      .status(201)
      .json({ message: `Started following ${followingId}`, follow });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function handleGetFollowing(req, res) {
  try {
    const userId = req.params?.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const allFollowingUsers = await followModel.find({ followerId: userId });
    return res.status(200).json({
      message: "Successfully fetched following list",
      followingUsers: allFollowingUsers.map((user) => user.followingId),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function handleGetFollowers(req, res) {
  try {
    const userId = req.params?.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const allFollowers = await followModel.find({ followingId: userId });
    return res.status(200).json({
      message: "Successfully fetched followers list",
      followers: allFollowers.map((user) => user.followerId),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function handleUnfollowUser(req, res) {
  try {
    const followerId = req.user?.userId;
    const followingId = req.params?.userId;

    if (!followerId || !followingId) {
      return res
        .status(400)
        .json({ message: "Invalid follower or following ID" });
    }

    const unfollowed = await followModel.deleteOne({ followerId, followingId });
    if (unfollowed.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "User not found or not followed" });
    }

    return res.status(200).json({ message: "Successfully unfollowed user" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  handleGetFollowers,
  handleGetFollowing,
  handleFollowUser,
  handleUnfollowUser,
};
