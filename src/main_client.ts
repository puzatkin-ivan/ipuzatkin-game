import {GameClient} from "./client/GameClient";
const socket: WebSocket = new WebSocket('ws://' + window.location.host);

const nickname = prompt("Enter Your Nickname", "");

GameClient.initGame(socket, nickname);