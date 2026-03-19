const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (user) => {
    users.push({ ...user, socketId: socket.id });

    const match = users.find(
      (u) =>
        u.socketId !== socket.id &&
        u.subject === user.subject &&
        (
          (u.emotion === "Motivated" && user.emotion === "Confused") ||
          (u.emotion === "Confused" && user.emotion === "Motivated")
        )
    );

    if (match) {
      const room = `${socket.id}-${match.socketId}`;

      socket.join(room);
      io.sockets.sockets.get(match.socketId)?.join(room);

      io.to(room).emit("matched", {
        room,
        users: [user, match],
      });

      users = users.filter(
        (u) => u.socketId !== socket.id && u.socketId !== match.socketId
      );

      console.log("Users matched in room:", room);
    }
  });

  socket.on("sendMessage", ({ room, message, sender }) => {
    io.to(room).emit("receiveMessage", { message, sender });
  });

  // ✅ Pass room through so the receiver knows which room they're in
  socket.on("offer", ({ offer, room }) => {
    console.log("Relaying offer to room:", room);
    socket.to(room).emit("offer", { offer, room });
  });

  socket.on("answer", ({ answer, room }) => {
    console.log("Relaying answer to room:", room);
    socket.to(room).emit("answer", { answer, room });
  });

  socket.on("ice-candidate", ({ candidate, room }) => {
    socket.to(room).emit("ice-candidate", { candidate, room });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    users = users.filter((u) => u.socketId !== socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});