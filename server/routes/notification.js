const express = require("express");

const {
  handleGetNotifications,
  handleDeleteNotification,
  handleMarkAsRead,
} = require("../controllers/notification");

const router = express.Router();

router.route("/").get(handleGetNotifications);
router
  .route("/:notificationId")
  .put(handleMarkAsRead)
  .delete(handleDeleteNotification);

module.exports = router;

// GET /api/notifications → Get notifications for the logged-in user
// PUT /api/notifications/:notificationId/read → Mark a notification as read
// DELETE /api/notifications/:notificationId → Delete a notification
