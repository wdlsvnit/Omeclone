(function () {
  let socket = io.connect('http://localhost:3000');
  socket.on('ack', (d) => {
    console.log(`Received: ${d}`);
  });
})();
