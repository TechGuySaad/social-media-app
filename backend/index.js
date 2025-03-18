const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const { restrictLoggedInUserOnly } = require("./middlewares/");
const dbConnect = require("./connect");
// Routers
const userSignupLoginRouter = require("./routes/user");
const postRouter = require("./routes/post");
const notificationRouter = require("./routes/notification");
const followRouter = require("./routes/follow");
const chatRouter = require("./routes/chat");
const { getUser } = require("./services/jwtAuth");

// ------------------------------------------
const messageModel = require("./models/messages");
const chatModel = require("./models/chat");
// ------------------------------------------

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

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
app.use("/api/chats", restrictLoggedInUserOnly, chatRouter);

app.use("/api/notifications", notificationRouter);
app.use("/api/users/:userId", followRouter);

const users = {};
// socket for messaging
io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id}`);

  // Register user on connection

  const token = socket.handshake.headers.authorization?.split("Bearer ")[1];
  const { userId, email } = getUser(token);

  if (!users[userId]) users[userId] = socket.id;
  console.log(users);

  // When user sends message

  // Handle sendMessage event
  socket.on("sendMessage", async ({ receiverId, content }) => {
    // taking the senderId from the header.authorization
    const { userId: senderId, email } = getUser(
      socket.handshake.headers.authorization.split("Bearer ")[1]
    );

    // creating a message
    const latestMessage = await messageModel.create({
      // chatId,
      senderId,
      receiverId,
      content,
    });

    console.log(latestMessage);

    // send the message to receiver with a particular socket id

    io.to(users[receiverId]).emit("receiveMessage", latestMessage);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    delete users[userId];
    console.log(`User disconnected: ${socket.id}`);
    console.log(users);
  });
});

server.listen(PORT, (err) => {
  console.log(`Server is running on Port ${PORT}`);
});
