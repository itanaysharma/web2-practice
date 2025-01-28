import { ChatRoom } from "../../../components/ChatRoom";
import { BACKEND_URL } from "../../config";

async function getRoomId(slug: string) {
  const response = await fetch(`${BACKEND_URL}/room/${slug}`);
  const data = await response.json();
  return data.id;
}

export default async function ChatRoom1({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = (await params).slug;
  const roomId = await getRoomId(slug);
  return <ChatRoom id={roomId} />;
}
