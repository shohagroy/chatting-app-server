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

    if (!onlineUsers.find((data) => data.user.id === loginUser.id)) {
      onlineUsers.push({
        user: { ...loginUser, isActive: true },
        socketId: socket.id,
      });
    }

    io.emit(
      "get-actives",
      onlineUsers.filter((el) => el !== loginUser.id)
    );
  });

  socket.on("typing", (data) => {
    io.emit("typing", data.participants);
  });

  socket.on("unseen", async (data) => {
    io.emit("unseen", { ...data.new, isNotSeen: true });
  });

  socket.on("seen", async (data) => {
    await updateConversatonStatus(data.id);
    io.emit("seen", data.id);
  });

  socket.on("disconnect", (data) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("get-actives", onlineUsers);
  });

  socket.on("conversation", (data) => {
    io.emit("message", data);
  });

  socket.on("login", (data) => {
    onlineUsers = onlineUsers.filter((info) => info.user.id !== data.id);

    io.emit("get-actives", [...onlineUsers, data]);
  });

  socket.on("offline", (id) => {
    onlineUsers = onlineUsers.filter((data) => data.user.userId !== id);

    io.emit("get-actives", onlineUsers);
  });
});

module.exports = server;
