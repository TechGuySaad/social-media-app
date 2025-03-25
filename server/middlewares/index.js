const { getUser } = require("../services/jwtAuth");

function restrictLoggedInUserOnly(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split("Bearer ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token format" });
    }

    const user = getUser(token);

    if (!user) {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid or expired token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token", error: error.message });
  }
}

module.exports = { restrictLoggedInUserOnly };
