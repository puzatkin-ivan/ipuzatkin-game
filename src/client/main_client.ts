var socket = new WebSocket('ws://localhost:3000');

socket.onmessage = function (message) {
  console.log('Connection 1', message.data);
};