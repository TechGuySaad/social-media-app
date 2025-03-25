const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  _id: String,
  permissions: [String],
});

const rolesModel = mongoose.model("role", rolesSchema);

module.exports = { rolesModel };
