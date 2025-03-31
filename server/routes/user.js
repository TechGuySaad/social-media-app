const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");
const multer = require("multer");

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/pfp");
  },
  filename: function (req, file, cb) {
    // console.log(req);

    const uniqueSuffix =
      "pfp" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.route("/login").post(handleUserLogin);

router.route("/signup").post(upload.single("pfp"), handleUserSignup);

module.exports = router;
