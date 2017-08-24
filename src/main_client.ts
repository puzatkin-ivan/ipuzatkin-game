import {GameClient} from "./client/GameClient";
const socket: WebSocket = new WebSocket('ws://' + window.location.host);

let nickname;

while (!nickname) {
  nickname = prompt("Enter Your Nickname", "");
}

GameClient.initGame(socket, nickname);