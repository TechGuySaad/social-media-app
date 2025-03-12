const jwt = require("jsonwebtoken");
const privateKey = "$$saad12$";

function setUser(payload) {
  return jwt.sign(payload, privateKey);
}

function getUser(token) {
  return jwt.verify(token, privateKey);
}

module.exports = { setUser, getUser };
