const mongoose = require("mongoose");

function dbConnect() {
  return mongoose.connect("mongodb://127.0.0.1:27017/social-media-app");
}

module.exports = dbConnect;
