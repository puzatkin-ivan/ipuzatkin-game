import {GameClient} from "./client/GameClient";
const socket: WebSocket = new WebSocket('ws://localhost:3000');

GameClient.initGame(socket);