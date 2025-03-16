const express = require("express");

const { restrictLoggedInUserOnly } = require("./middlewares/");
const dbConnect = require("./connect");
const userSignupLoginRouter = require("./routes/user");
const postRouter = require("./routes/post");
const notificationRouter = require("./routes/notification");
const followRouter = require("./routes/follow");
const chatRouter = require("./routes/chat");

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
app.use("/api/auth", userSignupLoginRouter);
app.use("/api/posts", restrictLoggedInUserOnly, postRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/users/:userId", followRouter);
app.use("/api/chats", chatRouter);

app.listen(PORT, (err) => {
  console.log(`Server is running on Port ${PORT}`);
});
