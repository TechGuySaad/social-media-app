const express = require("express");

const userSignupLoginRouter = require("./routes/user");
const dbConnect = require("./connect");
const { restrictLoggedInUserOnly } = require("./middlewares/");

const app = express();

const PORT = 8000;

// Mongodb connect
dbConnect()
  .then(() => {
    console.log("Connection successfully opened");
  })
  .catch(() => {
    console.log("error connecting");
  });
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/user", userSignupLoginRouter);

// user restrictLoggedInUserOnly on any route now that you want the user to be restricted to without the jwt token

app.listen(PORT, (err) => {
  console.log(`Server is running on Port ${PORT}`);
});
