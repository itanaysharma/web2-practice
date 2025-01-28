import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>(); // WebSocket is a global object in the browser
  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNDllYWM5YS1hYWFhLTRlNDMtYjU0Yi0xZDA3NWEyNmI5NzQiLCJpYXQiOjE3MzgwODQzNTB9.SymYIIyEN51_f-dk8eOq1BE9ssCpOunw--bZhF2nTac`
    );
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
  }, []);
  return { socket, loading };
}
