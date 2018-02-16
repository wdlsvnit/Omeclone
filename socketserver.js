'use strict';

const utils = require('./utils.js');
const uniqueID = require('uniqid');
const moment = require('moment');
const Conversation = require('./models/conversation');
const Message = require('./models/message');

// This is our socket server. All the events socket events will go here.
// Export the socket server
require('./globals.js');
module.exports = (io, app) => {
  io.on('connection', (socket) => {
    // Make a user object and add it to the onlineUsers list and rooms too(maybe we can add to room once we have the partner.)
    socket.emit('ack', { id: socket.id, msg: "User connected" });
    onlineUsers.push(socket);
    socket.on('privateRoom', (user) => {
      let unfilledRooms = rooms.filter((room) => {
        if (!room.isFilled) {
          console.log(room.roomID);
          return room;
        }
      });
      console.log(`Unfilled Rooms: ${JSON.stringify(unfilledRooms[0])}`);
      try {
        // join the existing room.
        socket.join(unfilledRooms[0].roomID);
        let index = rooms.indexOf(unfilledRooms[0]);
        rooms[index].isFilled = true;
        unfilledRooms[0].isFilled = true;
        socket.emit('private ack', { "message": "Added to privateRoom", "roomID": unfilledRooms[0].roomID });
        socket.roomID = unfilledRooms[0].roomID;
        let conversation = new Conversation({
          room: unfilledRooms[0].roomID
        });
        conversation.save((err, results) => {
          if (err) {
            console.log(err);
          }
        });
        console.log(`Joined existing room: ${unfilledRooms[0].roomID}`);
        console.log(`--------------------------------------------`);
      }
      catch(e) {
        // dont have unfilled rooms. Thus creating a new user.
        let uID = uniqueID();
        console.log(`Created new room: ${uID}`);
        rooms.push({ "roomID": uID, "isFilled": false });
        socket.join(uID);
        socket.roomID = uID;
        console.log(`Socket joined in room with id: ${uID}`);
        socket.emit('private ack', { "message": "Added to privateRoom", "roomID": uID });
        // console.log(`Current status of rooms: ${rooms}`);
        console.log(`--------------------------------------------`);
      }
      // create an unique id here.
      // let uID = uniqueID();
      // console.log(uID);
      // rooms.push({ "roomID": uID, "isFilled": false });
      // // Maintain a global room array which would store the room ids.
      // socket.join(uID);
      // // emit the room id to the frontend side.
      // socket.emit('private ack', { "message": "Added to privateRoom", "roomID": uID });
    });

    socket.on('sendMessage', (data) => {
      let timeStamp = moment().format('LT');
      io.sockets.in(data.room).emit('newMessage', { "message": data.message , "senderId": socket.id, "timeStamp": timeStamp});
      let msg = new Message({
        room: data.room,
        body: data.message,
        author: socket.id,
        sentAt: timeStamp
      });
      msg.save((err, results) => {
        if (err) {
          console.log(err);
        }
      });
    });

    // Disconnect the user
    socket.on('disconnect', () => {
      let index = onlineUsers.indexOf(socket);
      onlineUsers.splice(index,1);
      index = rooms.findIndex(x => x.roomID == socket.roomID);
      if (index >= 0) {
        if (rooms[index].isFilled == true) {
          io.sockets.in(socket.roomID).emit('alone', { "message": "stranger is disconnected", "roomID": socket.roomID });
          rooms.splice(index,1);
        }
        else {
          rooms.splice(index,1);
        }
      }
      else {
        Message.remove({ room: socket.roomID }, (err) => {
          if (err)
            console.log(err);
        });
        Conversation.remove({ room: socket.roomID }, (err) => {
          if (err)
            console.log(err);
        });
      }
      //console.log(rooms);
      //console.log(onlineUsers.length);
    });

    //delete stored logs
    socket.on('delete', (data) => {
      Message.remove({ room: data.roomID }, (err) => {
        if (err)
          console.log(err);
      });
      Conversation.remove({ room: data.roomID }, (err) => {
        if (err)
          console.log(err);
      });
    });
  });
}
