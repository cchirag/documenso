import { Server } from 'socket.io';

const SOCKET_PORT = 4000;
const io = new Server(SOCKET_PORT);

io.on('connection', (socket) => {
  console.log('Connected to Socket ID: ', socket.id);
  socket.on('create room', async (message) => {
    const { roomID } = JSON.parse(message);
    await socket.join(roomID);
    if (io.sockets.adapter.rooms.has(roomID)) {
      console.log('Socket: ', socket.id, 'joined room: ', roomID);
      socket.send('success');
    } else {
      console.log('Failed to join room: ', roomID);
      socket.send('failed');
    }
  });

  socket.on('join room', async (message) => {
    const { roomID } = JSON.parse(message);
    if (io.sockets.adapter.rooms.has(roomID)) {
      await socket.join(roomID);
      if (socket.rooms.has(roomID)) {
        console.log('Socket: ', socket.id, 'joined room: ', roomID);
        socket.send('success');
      } else {
        console.log('Failed to join room: ', roomID);
        socket.send('failed');
        socket.disconnect();
      }
    } else {
      console.log('Room ', roomID, 'does not exist');
      socket.send('failed');
      socket.disconnect();
    }
  });

  socket.on('sign', (message) => {
    const { signature, roomID } = JSON.parse(message);
    if (socket.rooms.has(roomID)) {
      socket.to(roomID).emit('signature', signature);
    } else {
      socket.send('failed');
    }
  });
});
