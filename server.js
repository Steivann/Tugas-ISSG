const http = require("http");
const { disconnect } = require("process");
const socketIo = require("socket.io");
const { Socket } = require("socket.io-client");
const { SourceTextModule } = require("vm");

const server = http.createServer();
const io = socketIo(server);

io.on("connection", (socket) =>{
  console.log(`Client ${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });

  socket.on("message", (data) => {
    let{ username, message } = data;
    console.log(`Receiving message from ${username}: ${message}`);

    io.emit("message", data);
  });
});


const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});