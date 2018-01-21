"use strict";
require('./globals.js');

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
  // Return a room object from here which we will add to our global rooms. The object format should be like:
  return {
    "roomID": 234234, // A random number which should be unique for every room. Figure out the logic. You can use any external npm module.
    "users" : [queue[0], queue[1]] // This will be an array containing the first objefct from the queue above and a object at random index in queue apart from first one.
  }
}

module.exports = {
  makeUserObject,
  makeRoom
}
