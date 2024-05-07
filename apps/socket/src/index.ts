import { Server } from 'socket.io';

const SOCKET_PORT = 4000;
const io = new Server(SOCKET_PORT);

io.on('connection', (socket) => {
  console.log('Connected');
  socket.on('message', (whatever) => {
    console.log(whatever);
    socket.send(whatever);
  });
});
