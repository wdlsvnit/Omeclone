'use strict';
// Export the socket server

module.exports = (io, app) => {
  io.on('connection', (socket) => {
    console.log(`Socket: ${socket.id}`);
    socket.emit('ack', { id: socket.id });
  });
}
