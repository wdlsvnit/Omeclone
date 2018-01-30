'use strict';

(function () {
  let socket = io.connect(`${window.location.hostname}:${window.location.port}`);
  let room_id_of_other_user = ' ';
  socket.on('ack', (d) => {
    console.log(`Received: ${d}`);
  });

  let message = document.querySelector('#message');
  let sendbtn = document.querySelector('#sendbtn');
  socket.emit('privateRoom', { "room": "private room" });

  sendbtn.addEventListener('click', () => {
    console.log(`Sending message to ${room_id_of_other_user}`);
    socket.emit('sendMessage', { "room": room_id_of_other_user, "message": message.value });
    message.value = ' ';
  });

  socket.on('private ack', (data) => {
    room_id_of_other_user = data.roomID;
    console.log(`Private ack: ${data.message} ${data.roomID}`);
  });

  socket.on('newMessage', (data) => {
    console.log(data);
  });

})();
