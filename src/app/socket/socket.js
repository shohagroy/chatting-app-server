const http = require("http");
const socketIO = require("socket.io");
const app = require("../../app");
const { updateIsSeen } = require("../models/conversation/conversation.service");

const server = http.createServer(app);

const io = socketIO(server);

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

    io.emit("get-actives", onlineUsers);
  });

  socket.on("typing", (data) => {
    io.emit("typing", data.user);
  });

  socket.on("unseen", async (data) => {
    io.emit("unseen", { ...data.new, isNotSeen: true });
  });

  socket.on("seen", async (data) => {
    updateIsSeen(data.conversationPartnerQuery);
    io.emit("seen", data.conversationPartnerQuery);
  });

  socket.on("disconnect", (data) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("get-actives", onlineUsers);
  });

  socket.on("conversation", (data) => {
    io.emit("message", data);
  });

  socket.on("offline", (id) => {
    onlineUsers = onlineUsers.filter((data) => data.user.userId !== id);

    io.emit("get-actives", onlineUsers);
  });
});

module.exports = server;
