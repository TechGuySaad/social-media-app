function handleUserSignup(req, res) {
  console.log("A post request was made to signup route");
  res.status(201).json({ status: "success", message: "user was created" });
}

function handleUserLogin(req, res) {
  console.log("A post request was made to login route");
  res.status(200).json({ status: "success", message: "user was logged in" });
}

module.exports = { handleUserSignup, handleUserLogin };
