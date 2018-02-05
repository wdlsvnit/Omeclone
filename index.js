'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
require('./socketserver.js')(io, app);

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
+app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/chat', (req, res) => {
  res.render('chat');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
