const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");

const router = express.Router();

router.route("/login").post(handleUserLogin);

router.route("/signup").post(handleUserSignup);

module.exports = router;
