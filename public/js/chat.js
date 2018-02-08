'use strict';

(function () {
  let socket = io.connect(`${window.location.hostname}:${window.location.port}`);
  let room_id_of_other_user = ' ';
  socket.on('ack', (d) => {
    console.log(`Received: ${d}`);
  });

  let message = document.querySelector('#message');
  let sendbtn = document.querySelector('#sendbtn');
  let endbtn = document.querySelector('#endbtn');
  let newbtn = document.querySelector('#newbtn');
  let cancel = document.querySelector('#cancel');
  socket.emit('privateRoom', { "room": "private room" });


  message.addEventListener("keyup", event => {
    event.preventDefault();
    if(event.key !== "Enter") return;
    sendbtn.click();
  });

  sendbtn.addEventListener('click', () => {
    if((message.value.trim()).length !== 0) {
      console.log(`Sending message to ${room_id_of_other_user}`);
      socket.emit('sendMessage', { "room": room_id_of_other_user, "message": message.value });
      message.value = ' ';
    }
  });

  socket.on('private ack', (data) => {
    room_id_of_other_user = data.roomID;
    console.log(`Private ack: ${data.message} ${data.roomID}`);
  });

  socket.on('newMessage', (data) => {
    let msgs = document.querySelector("#msgs");
    let template;
    if(socket.id == data.senderId){
      template = `<div class="one column row msg"><div class="right floated purple seven wide column">${data.message}</div></div><br>`;
    } else {
      template = `<div class="one column row msg"><div class="left floated pink seven wide column">${data.message}</div></div><br>`;
    }
    msgs.insertAdjacentHTML('beforeend', template);
    let height = msgs.offsetHeight;
    window.scroll(0,height);
  });

  socket.on('alone', (data) => {
    console.log(`alone: ${data.message}`);
    endbtn.classList.add('hide');
    newbtn.classList.remove('hide');
    sendbtn.classList.add('hide');
    message.classList.add('hide');
  });

  newbtn.addEventListener('click', () => {
    socket.emit('privateRoom', { "room": "private room" });
    endbtn.classList.remove('hide');
    newbtn.classList.add('hide');
    sendbtn.classList.remove('hide');
    message.classList.remove('hide');
    document.querySelector("#msgs").innerHTML = "";
  });

  endbtn.addEventListener('click', () => {
    let confirm = document.querySelector('#confirm');
    confirm.classList.add('visible');
  });

  cancel.addEventListener('click', () => {
    let confirm = document.querySelector('#confirm');
    confirm.classList.remove('visible');
  });

})();
