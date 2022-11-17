import { useState, useEffect } from "react";
import { Client } from "../client";

export function useClient() {
  const [client, setClient] = useState<Client|undefined>(undefined);
  useEffect(() => {
    const retry = createClient('wss://c4.jamespackard.me', setClient, () => setClient(undefined), 5_000);
    return () => retry.cancel();
  }, []);
  return client;
}

function createClient(url: string, onClientReady: (client: Client) => void, onClientUnready: () => void, retry_delay: number): { cancel: () => void }{
  const socket = new WebSocket('wss://c4.jamespackard.me');
  const retry = { cancel: () => {} };
  function onOpen() {
    const client = new Client(socket);
    const onClose = () => {
      client.stop();
      socket.removeEventListener('open', onOpen);
      socket.removeEventListener('close', onClose);
      onClientUnready();
      const timeout = setTimeout(() => {
        retry.cancel = createClient(url, onClientReady, onClientUnready, retry_delay).cancel;
      }, retry_delay);
      retry.cancel = () => clearTimeout(timeout);
    };
    socket.addEventListener('close', onClose);
  }
  socket.addEventListener('open', onOpen);
  return retry;
}