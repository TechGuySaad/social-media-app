const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: function () {
        return !this.mediaUrl; // Content is required if no media is attached
      },
    },
    mediaUrl: {
      type: String,
      default: null,
    },
    mediaType: {
      type: String,
      enum: [null, "image", "video", "document"],
      default: null,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for full media URL if you're using a CDN or base URL
postSchema.virtual("fullMediaUrl").get(function () {
  if (!this.mediaUrl) return null;
  return `${process.env.BASE_URL || ""}${this.mediaUrl}`;
});

const postsModel = mongoose.model("post", postSchema);

module.exports = postsModel;
