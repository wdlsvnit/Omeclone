'use strict';

(function () {
  let socket = io.connect(`${window.location.hostname}:${window.location.port}`);
  socket.on('ack', (d) => {
    console.log(`Received: ${d}`);
  });
})();
