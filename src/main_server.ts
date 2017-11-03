import * as express from 'express';
import * as http from 'http';
import * as path from "path";
import {GameServer} from "./server/GameServer";
import socketio = require("socket.io");

const app = express();
app.use("/", express.static(path.join(__dirname, "../client")));

const server = http.createServer(app);
const ioServer: SocketIO.Server = socketio(server);


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server started on port ${server.address().port}`);
  GameServer.initGameServer(ioServer)
});