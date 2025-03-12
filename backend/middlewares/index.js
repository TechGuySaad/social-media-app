const { response } = require("express");
const { getUser } = require("../services/jwtAuth");

function restrictLoggedInUserOnly(req, res, next) {
  const token = req?.headers?.authorization.split("Bearer ")[1];

  try {
    getUser(token);
  } catch (error) {
    return res.status(404).json({ message: "you have been logged out" });
  }

  next();
}

module.exports = { restrictLoggedInUserOnly };
