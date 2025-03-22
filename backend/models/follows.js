const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    followerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    followingId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const followModel = mongoose.model("follow", followSchema);

module.exports = followModel;
