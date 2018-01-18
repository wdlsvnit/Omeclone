'use strict';

(function () {
  let socket = io.connect(`${window.location.hostname}:${window.location.port}`);
  socket.on('ack', (d) => {
    console.log(`Received: ${d}`);
  });

  let message = document.querySelector('#message');
  let sendbtn = document.querySelector('#sendbtn');

  sendbtn.addEventListener('click', () => {
    // need to emit the event to send the message. to be done later
  });

})();
