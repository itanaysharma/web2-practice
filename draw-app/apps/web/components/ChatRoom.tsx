import { BACKEND_URL } from "../app/config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string) {
  const response = await fetch(`${BACKEND_URL}/chats/${roomId}`);
  const data = await response.json();
  console.log(data);
  return data.messages;
}

export async function ChatRoom({ id }: { id: string }) {
  const messages = await getChats(id);
  return <ChatRoomClient messages={messages} id={id} />;
}
