"use strict";
require('./globals.js');

function makeUserObject(socket) {
  return new Promise((resolve, reject) => {
    let newUser = {
      "userID": socket.id,
      "roomID": Math.random() * 10,
      "inRoom": false
    }
    resolve(newUser);
  });
}

module.exports = {
  makeUserObject
}
