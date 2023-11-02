const http = require("http");
const socketIO = require("socket.io");
const app = require("../../app");
const { updateIsSeen } = require("../models/conversation/conversation.service");

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

  socket.on("unseen", async (data) => {
    // updateNotSeen(data.new.conversationId);
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
    onlineUsers = onlineUsers.filter((user) => user.userId !== id);
    io.emit("get-actives", onlineUsers);
  });
});

module.exports = server;
