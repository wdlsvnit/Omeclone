"use strict";

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log(`Socket: ${socket.id}`);
  socket.emit('ack', { id: socket.id });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/chat', (req, res) => {
  res.render('chat');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
