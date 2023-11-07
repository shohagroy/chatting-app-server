const http = require("http");
const socketIO = require("socket.io");
const app = require("../../app");
const {
  updateConversatonStatus,
} = require("../models/conversation/conversation.service");

const server = http.createServer(app);

const io = socketIO(server, { transports: ["websocket"] });

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("join", (loginUser) => {
    socket.join(loginUser);

    if (!onlineUsers.find((user) => user.id === loginUser.id)) {
      onlineUsers.push({ ...loginUser, isActive: true, socketId: socket.id });
    }

    io.emit("get-actives", onlineUsers);
  });

  socket.on("typing", (data) => {
    io.emit("typing", data.participants);
  });

  socket.on("unseen", async (data) => {
    io.emit("unseen", { ...data.new, isNotSeen: true });
  });

  socket.on("seen", async (info) => {
    await updateConversatonStatus(info.data._id);
    io.emit("seen", info.data);
  });

  socket.on("disconnect", (data) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("get-actives", onlineUsers);
  });

  socket.on("conversation", (data) => {
    io.emit("message", data);
  });

  socket.on("login", (data) => {
    onlineUsers = onlineUsers.filter((user) => user.id !== data.id);

    io.emit("get-actives", [...onlineUsers, data]);
  });

  socket.on("offline", (id) => {
    onlineUsers = onlineUsers.filter((user) => user.id !== id);

    io.emit("get-actives", onlineUsers);
  });
});

module.exports = server;
