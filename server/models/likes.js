const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
  },
  { timestamps: true }
);
likeSchema.index({ userId: 1, postId: 1 }, { unique: true });
const likeModel = mongoose.model("like", likeSchema);
module.exports = likeModel;
