const userModel = require("../models/user");

async function handleUserSignup(req, res) {
  const body = req?.body;
  const user = await userModel.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  });

  try {
    return res.status(201).json({ status: "success", message: user });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "Either user exists or problem with input" });
  }
}

function handleUserLogin(req, res) {
  console.log("A post request was made to login route");
  res.status(200).json({ status: "success", message: "user was logged in" });
}

module.exports = { handleUserSignup, handleUserLogin };
