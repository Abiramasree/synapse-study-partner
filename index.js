const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

let waitingUsers = []; // store users waiting for match

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userData) => {
    const { name, subject, emotion } = userData;

    // ❌ Prevent self match
    const match = waitingUsers.find(
      (user) =>
        user.subject === subject &&
        user.socketId !== socket.id
    );

    if (match) {
      // Remove matched user
      waitingUsers = waitingUsers.filter(
        (user) => user.socketId !== match.socketId
      );

      // Join private room
      const room = match.socketId + socket.id;
      socket.join(room);
      io.to(match.socketId).socketsJoin(room);

      // Send match info
      io.to(room).emit("matched", {
  room,
  users: [
    { name, emotion },
    { name: match.name, emotion: match.emotion }
  ]
});

    } else {
      waitingUsers.push({
        socketId: socket.id,
        name,
        subject,
        emotion,
      });
    }
  });

  socket.on("sendMessage", ({ room, message, sender }) => {
    io.to(room).emit("receiveMessage", {
      message,
      sender,
    });
  });

  socket.on("disconnect", () => {
    waitingUsers = waitingUsers.filter(
      (user) => user.socketId !== socket.id
    );
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
