"use strict";

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

io.on('connection', (socket) => {
  console.log(`Socket: ${socket.id}`);
  // socket.emit('news', { hello: "world" });
  // socket.on('other', (data) => {
  //   console.log(data);
  // });
});

app.get('/', (req, res) => {
  res.render('index');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
