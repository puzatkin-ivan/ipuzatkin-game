'use strict';

import * as Server from "ws";

const PORT = 3000;
var WebSocketServer = Server;
var server = new WebSocketServer({ port: PORT });

server.on('connection', (socket) => {
  console.log(socket);
  socket.emit('message', "");
});


console.log('Server is running on port', PORT);