'use strict';

(function () {
  let socket = io.connect(`${window.location.hostname}:${window.location.port}`);
  socket.on('ack', (d) => {
    console.log(`Received: ${d}`);
  });

  let message = document.querySelector('#message');
  let sendbtn = document.querySelector('#sendbtn');
  socket.emit('privateRoom', { "room": "private room" });

  sendbtn.addEventListener('click', () => {
    console.log(message.value);
    socket.emit('sendMessage', { "room": "private room", "message": message.value });
    message.value = ' ';
  });

  socket.on('private ack', (data) => {
    console.log(data.message);
  });

  socket.on('newMessage', (data) => {
    console.log(data);
  });

})();
