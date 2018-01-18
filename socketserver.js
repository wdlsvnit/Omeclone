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
    utils.makeUserObject(socket).then(data => {
      onlineUsers.push(data);
    });
  });

  // Disconnect the user
  io.on('disconnect', (socket) => {
    console.log(`${socket.id} disconnected.`);
    // console.log(onlineUsers);
  });
}
