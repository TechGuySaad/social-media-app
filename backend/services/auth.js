const jwt = require("jsonwebtoken");

function setUser(payload) {
  return jwt.sign(payload);
}

function getUser(token) {
  return jwt.verify(token);
}

module.exports = { setUser, getUser };
