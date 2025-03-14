const express = require("express");

const { restrictLoggedInUserOnly } = require("./middlewares/");
const dbConnect = require("./connect");
const userSignupLoginRouter = require("./routes/user");
const postRouter = require("./routes/post");
// const { rolesModel } = require("./models/roles");

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
// user restrictLoggedInUserOnly on any route now that you want the user to be restricted to without the jwt token
app.use("/user", userSignupLoginRouter);
app.use("/posts", postRouter);

app.listen(PORT, (err) => {
  console.log(`Server is running on Port ${PORT}`);
});

// Temporary role creation route

// app.post("/create-role", async (req, res) => {
//   const { role, permissions } = req.body;
//   // console.log(role, permissions[0]);

//   const createdRole = await rolesModel.create({
//     _id: role,
//     permissions,
//   });
//   return res.status(200).json({ message: "success", createdRole });
// });
