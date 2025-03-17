const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
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
      index: true, // Improves query performance
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

commentSchema.index({ postId: 1, userId: 1 }); // Optional index for faster lookups

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
