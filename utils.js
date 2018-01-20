"use strict";
require('./globals.js');
const uniqid = require('uniqid');

function makeUserObject(socket) {
  return new Promise((resolve, reject) => {
    let newUser = {
      "userID": socket.id,
      "inRoom": false
    }
    resolve(newUser);
  });
}

function makeRoom(queue) {
  return new Promise((resolve, reject) => {
    if(queue.length > 1){
      let id = uniqid();
      let random = Math.floor(Math.random() * (queue.length - 1)) + 1; //get random index.
      let sUser = queue.splice(random,1)[0];
      let fUser = queue.splice(0,1)[0];
      let room = {
        "roomID" : id,
        "users" : [fUser,sUser]
      }
      let index = onlineUsers.indexOf(fUser);
      onlineUsers[index].inRoom = true;
      index = onlineUsers.indexOf(sUser);
      onlineUsers[index].inRoom = true;
      resolve(room);
    }
    else{
      console.log("alone");
    }
  });
}

module.exports = {
  makeUserObject,
  makeRoom
}