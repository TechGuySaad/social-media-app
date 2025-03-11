const express = require("express");

const userSignupLoginRouter = require("./routes/user");
const { testMiddle } = require("./middlewares");

const app = express();

const PORT = 8000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/user", userSignupLoginRouter);

app.listen(PORT, (err) => {
  console.log(`Server is running on Port ${PORT}`);
});
