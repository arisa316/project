import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { createConnection } from 'typeorm';

// Initialize Express app
const app = express();
const server = createServer(app);
const io = new Server(server);

// Socket.IO event handling
io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  // Handle events
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Initialize TypeORM connection
createConnection()
  .then(() => console.log('Connected to the database'))
  .catch(error => console.log('Error connecting to the database: ', error));
