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

// Models
const messageModel = require("./models/messages");

// ------------------------------------------

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

const PORT = process.env.PORT || 8000;

// Connect to MongoDB
dbConnect()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) =>
    console.error("❌ Error connecting to database:", err.message)
  );

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/auth", userSignupLoginRouter);
app.use("/api/posts", restrictLoggedInUserOnly, postRouter);
app.use("/api/chats", restrictLoggedInUserOnly, chatRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/users/:userId", followRouter);

// Store connected users
const users = {};

// Socket.io for messaging
io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  try {
    // Extract token and authenticate user
    const token = socket.handshake.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      console.log("❌ No token provided, disconnecting user...");
      socket.disconnect();
      return;
    }

    const user = getUser(token);
    if (!user || !user.userId) {
      console.log("❌ Invalid or expired token, disconnecting user...");
      socket.disconnect();
      return;
    }

    const { userId } = user;

    // Register user with socket ID
    users[userId] = socket.id;
    console.log("Connected Users:", users);

    // Handle sendMessage event
    socket.on("sendMessage", async ({ receiverId, content }) => {
      try {
        if (!receiverId || !content) {
          return console.log("❌ Invalid message payload");
        }

        // Create new message
        const latestMessage = await messageModel.create({
          senderId: userId,
          receiverId,
          content,
        });

        console.log("📨 Message sent:", latestMessage);

        // Send message to receiver if they are online
        if (users[receiverId]) {
          io.to(users[receiverId]).emit("receiveMessage", latestMessage);
        }
      } catch (error) {
        console.error("❌ Error handling sendMessage event:", error.message);
      }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
      delete users[userId];
    });
  } catch (error) {
    console.error("❌ Error in socket connection:", error.message);
    socket.disconnect();
  }
});

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
