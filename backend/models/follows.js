const mongoose = require("mongoose");
// followId
// followerId
// followingId
// createdAt
new mongoose.Schema(
  {
    followerId: { type: mongoose.Schema.Types.ObjectId },
    followingId: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

mongoose.model("follow");

module.exports = followModel;
