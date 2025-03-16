const userModel = require("../models/user");
const { setUser, getUser } = require("../services/jwtAuth");
const bcrypt = require("bcrypt");

async function handleUserSignup(req, res) {
  const { firstName, lastName, email, password, bio } = req?.body;

  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  try {
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      bio,
      password: await hashPassword,
    });

    return res
      .status(201)
      .json({ status: "success", message: "Succesfully signed up" });
  } catch (error) {
    return res.status(400).json({
      status: "Either user exists or problem with input",
      error: error,
    });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req?.body;

  const user = await userModel.findOne({
    email: email,
  });

  if (!user) return res.status(404).json({ message: "user not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(404).json({ message: "Invalid credentials" });
  const token = setUser({
    userId: user._id,
    email: user.email,
  });
  req.user = user;

  return res
    .header("Authorization", `Bearer ${token}`)
    .status(200)
    .json({ message: "login successful" });
}

module.exports = { handleUserSignup, handleUserLogin };
