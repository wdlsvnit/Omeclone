'use strict';

const utils = require('./utils.js');
// console.log(utils.makeUserObject);

// This is our socket server. All the events socket events will go here.
// Export the socket server
require('./globals.js');
module.exports = (io, app) => {
  io.on('connection', (socket) => {
    // Make a user object and add it to the onlineUsers list and rooms too(maybe we can add to room once we have the partner.)
    socket.emit('ack', { id: socket.id, msg: "User connected" });

    onlineUsers.push(socket);
    socket.on('privateRoom', (user) => {
      socket.join(user.room);
      socket.emit('private ack', { "message": "Added to privateRoom" });
    });

    socket.on('sendMessage', (data) => {
      io.sockets.in(data.room).emit('newMessage', { "message": data.message });
    });
  });

  // Disconnect the user
  io.on('disconnect', (socket) => {
    console.log(`${socket.id} disconnected.`);
    // console.log(onlineUsers);
  });
}
