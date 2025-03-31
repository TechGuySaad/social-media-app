const userModel = require("../models/user");
const { setUser } = require("../services/jwtAuth");
const bcrypt = require("bcrypt");

// User Signup
async function handleUserSignup(req, res) {
  // console.log(req.body);
  // console.log(req.file);
  const filePath = "/" + req?.file?.path.replace(/\\/g, "/"); // Normalize for cross-platform

  try {
    const { firstName, lastName, email, password, bio } = req?.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      bio,
      profilePicture: filePath,
      password: hashPassword,
    });
    return res.status(201).json({
      status: "success",
      message: "Successfully signed up",
      user: { id: user._id, firstName, lastName, email, bio },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error signing up",
      error: error.message,
    });
  }
}

// User Login
async function handleUserLogin(req, res) {
  try {
    const { email, password } = req?.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = setUser({
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      pfp: user.profilePicture,
    });

    return res
      .header("Authorization", `Bearer ${token}`)
      .status(200)
      .json({
        message: "Login successful",
        token,
        user: { id: user._id, email, pfp: user.profilePicture },
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
}

module.exports = { handleUserSignup, handleUserLogin };
