const userModel = require("../models/user");
const { setUser, getUser } = require("../services/jwtAuth");

async function handleUserSignup(req, res) {
  const body = req?.body;
  try {
    const user = await userModel.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
    });

    return res.status(201).json({ status: "success", message: user });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "Either user exists or problem with input" });
  }
}

async function handleUserLogin(req, res) {
  const body = req.body;

  const user = await userModel.findOne({
    email: body.email,
    password: body.password,
  });

  if (!user) return res.status(404).json({ message: "user not found" });
  const token = setUser({
    email: user.firstName,
    firstName: user.firstName,
    email: user.email,
  });

  return res
    .header("Authorization", `Bearer ${token}`)
    .status(200)
    .json({ message: "login successful" });
}

module.exports = { handleUserSignup, handleUserLogin };
