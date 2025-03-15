const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId },

    content: {
      type: String,
      required: true,
    },
    likesCount: { type: Number },
    commentsCount: { type: Number },
  },
  { timestamps: true }
);

const postsModel = mongoose.model("post", postSchema);

module.exports = { postsModel };
