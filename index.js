'use strict';

const express = require('express');
const faker = require('faker');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
require('./socketserver.js')(io, app);
require('./globals.js');



app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', (req, res) => {
  let noOfUsers = onlineUsers.length;
  if (noOfUsers > 1) {
    noOfUsers = noOfUsers + " users";
  }
  else {
    noOfUsers = noOfUsers + " user";
  }
  res.render('index', { noOfUsers: noOfUsers });
});

app.get('/chat', (req, res) => {
  let randomName = faker.name.findName();
  res.render('chat', { userName: randomName });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
