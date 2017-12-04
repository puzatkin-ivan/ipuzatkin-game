import ioClient = require("socket.io-client");
import {GameClient} from "./client/GameClient";

let nickname;

while (!nickname) {
  nickname = prompt("Enter Your Nickname", "");
}

GameClient.initGame(ioClient(), nickname);
