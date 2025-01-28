//8. went into the ws-backend folder and ran pnpm add ws @types/ws to install websocket

import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";
const wss = new WebSocketServer({ port: 8080 });
interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}
const users: User[] = [];
function checkUser(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") {
      return null;
    }
    if (!decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (e) {
    return null;
  }
}
wss.on("connection", function connection(ws, request) {
  const url = request.url; // this is the url that the client is connecting to
  if (!url) {
    return;
  }
  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get("token") || "";
  const userId = checkUser(token);
  console.log(userId);
  if (!userId) {
    ws.send("Unauthorized");
    ws.close();
    return;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });
  ws.on("message", async function message(data) {
    const parsedData = JSON.parse(data.toString()); //{type: "join-room", roomId: "123"}

    if (parsedData.type === "join-room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }
    if (parsedData.type === "leave-room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter((x) => x !== parsedData.roomId);
    }
    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      await prismaClient.chat.create({
        data: {
          message,
          roomId,
          userId,
        },
      });
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message,
              roomId,
            })
          );
        }
      });
    }
  });
});
