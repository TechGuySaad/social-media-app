const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },

        description: { type: String, required: true },

        createdAt: { type: Date, default: Date.now() },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const postsModel = mongoose.model("post", postSchema);

module.exports = { postsModel };
