'use strict';

(function () {
  let socket = io.connect(`${window.location.hostname}:${window.location.port}`);
  let room_id_of_other_user = ' ';
  let autolinker = new Autolinker({ newWindow: false, stripPrefix: false });

  socket.on('ack', (d) => {
    console.log(`Received: ${d}`);
  });

  let message = document.querySelector('#message');
  let sendbtn = document.querySelector('#sendbtn');
  let endbtn = document.querySelector('#endbtn');
  let newbtn = document.querySelector('#newbtn');
  let close = document.querySelector('#close');
  let cancel = document.querySelector('#cancel');
  let cancelFeed = document.querySelector('#cancelFeed');
  socket.emit('privateRoom', {
    "room": "private room"
  });

  socket.on('toast', (data) => {
    toastr.options = {
      "positionClass": "toast-top-center",
      "hideDuration": 300,
      "timeOut": 4000
    };
    toastr.success(data.message);
  });

  message.addEventListener("keyup", event => {
    event.preventDefault();
    if (event.key !== "Enter") return;
    sendbtn.click();
  });

  sendbtn.addEventListener('click', () => {
    if ((message.value.trim()).length !== 0) {
      console.log(`Sending message to ${room_id_of_other_user}`);
      let encryptedMessage = encode(message.value);
      socket.emit('sendMessage', {
        "room": room_id_of_other_user,
        "encryptedMessage": encryptedMessage
      });
      message.value = ' ';
    }
  });

  socket.on('private ack', (data) => {
    room_id_of_other_user = data.roomID;
    console.log(`Private ack: ${data.message} ${data.roomID}`);
  });

  socket.on('newMessage', (data) => {
    let decryptedMessage = decode(data.message.encryptedMessage);
    let msgs = document.querySelector("#msgs");
    let template;
    decryptedMessage = autolinker.link(decryptedMessage);
    if (socket.id == data.senderId) {
      template = `<div class="one column row msg"><div class="right floated blue seven wide column msg_div">${decryptedMessage}<span class="times_css">${data.timeStamp}</span></div></div><br>`;
    } else {
      template = `<div class="one column row msg"><div class="left floated blue seven wide column msg_div">${decryptedMessage}<span class="times_css">${data.timeStamp}</span></div></div><br>`;
    }
    msgs.insertAdjacentHTML('beforeend', template);
    let height = msgs.offsetHeight;
    window.scroll(0, height);
  });

  socket.on('alone', (data) => {
    console.log(`stranger disconnected`);
    endbtn.classList.add('hide');
    newbtn.classList.remove('hide');
    sendbtn.classList.add('hide');
    message.classList.add('hide');
    homebtn.classList.remove('hide');
    toastr.options = {
      "positionClass": "toast-top-center",
      "hideDuration": 300,
      "timeOut": 4000
    };
    toastr.warning(data.warning.message, data.warning.title);
  });

  endbtn.addEventListener('click', () => {
    let confirm = document.querySelector('#confirm');
    confirm.classList.add('visible');
  });
  feedBtn.addEventListener('click', () => {
    let feedback = document.querySelector('#feedback');
    feedback.classList.add('visible');
  });

  cancel.addEventListener('click', () => {
    let confirm = document.querySelector('#confirm');
    confirm.classList.remove('visible');
  });
  cancelFeed.addEventListener('click', () => {
    let confirmFeedback = document.querySelector('#feedback')
    confirmFeedback.classList.remove('visible');
  });
  
  close.addEventListener('click', () => {
    let confirm = document.querySelector('#confirm');
    message.classList.add('hide');
    sendbtn.classList.add('hide');
    endbtn.classList.add('hide');
    homebtn.classList.remove('hide');
    newbtn.classList.remove('hide');
    confirm.classList.remove('visible');
    socket.disconnect();
  });

})();

window.onload = () => {
  message.focus();
}
