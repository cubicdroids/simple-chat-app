// index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Set up a basic route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Listen for socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages
  socket.on('chat message', (message) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Listen for disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
