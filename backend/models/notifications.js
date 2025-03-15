const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId },
    type: { type: String, enum: ["like", "comment", "follow", "message"] },
    fromUserId: { type: mongoose.Schema.Types.ObjectId },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "targetType",
    },
    targetType: {
      type: String,
      enum: ["posts", "likes", "comments", "follows", "messages"],
    },
    isRead: { type: Boolean },
  },
  { timestamps: true }
);

const notificationModel = mongoose.model("notification", notificationSchema);

module.exports = notificationModel;
