//8. went into the ws-backend folder and ran pnpm add ws @types/ws to install websocket

import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
const wss = new WebSocketServer({ port: 8080 });
function checkUser(token: string) {
  const decoded = jwt.verify(token, JWT_SECRET);
  if (typeof decoded === "string") {
    return null;
  }
  if (!decoded || !decoded.userId) {
    return null;
  }
  return decoded.userId;
}
wss.on("connection", function connection(ws, request) {
  const url = request.url; // this is the url that the client is connecting to
  if (!url) {
    return;
  }
  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get("token") || "";
  const userId = checkUser(token);
  if (!userId) {
    ws.send("Unauthorized");
    ws.close();
    return;
  }
  ws.on("message", function message(data) {
    ws.send("pong");
  });
});
