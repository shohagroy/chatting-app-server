const http = require("http");
const socketIO = require("socket.io");
const app = require("../../app");

const server = http.createServer(app);

const io = socketIO(server);

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("join", (newUserId) => {
    socket.join(newUserId);

    if (!onlineUsers.some((user) => user.userId === newUserId)) {
      onlineUsers.push({ userId: newUserId, socketId: socket.id });
    }

    io.emit("get-actives", onlineUsers);
  });

  socket.on("typing", (data) => {
    io.emit("typing", data.user);
  });

  socket.on("disconnect", (data) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-actives", onlineUsers);
  });

  socket.on("conversation", (data) => {
    io.emit("message", data);
  });

  socket.on("offline", (id) => {
    onlineUsers = onlineUsers.filter((user) => user.userId !== id);
    io.emit("get-actives", onlineUsers);
  });
});

module.exports = server;
