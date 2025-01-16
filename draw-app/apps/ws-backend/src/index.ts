//8. went into the ws-backend folder and ran pnpm add ws @types/ws to install websocket

import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    ws.send("pong");
  });
});
