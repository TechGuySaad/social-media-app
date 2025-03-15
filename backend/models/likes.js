const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  },
  { timestamps: true }
);

const likeModel = mongoose.model("like", likeSchema);
module.exports = likeModel;
