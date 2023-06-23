const http = require("http");
const socketIO = require("socket.io");
const app = require("../../app");

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  //   console.log("A user connected");

  socket.on("join", (room) => {
    socket.join(room);
    // Perform necessary actions when a user joins a room
  });

  socket.on("conversation", (data) => {
    // Broadcast the message to everyone in the room
    // console.log(data);
    io.to(data.room).emit("message", data);
  });

  socket.on("typing", (data) => {
    // Broadcast typing event to everyone in the room
    // console.log("user typing", data);
    socket.to(data.room).emit("typing", data.user);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

module.exports = server;
