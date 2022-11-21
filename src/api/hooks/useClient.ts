import { useState, useEffect } from "react";
import { Client } from "../client";

export function useClient() {
  const [client, setClient] = useState<Client|undefined>(undefined);
  useEffect(() => {
    const controller = new WebSocketRetry('wss://c4.jamespackard.me', socket => setClient(socket && new Client(socket)), 5_000);
    controller.start();
    return () => controller.stop();
  }, []);
  useEffect(() => {
    if (client) {
      return () => client.stop();
    }
  }, [client]);
  return client;
}

class WebSocketRetry {

  private readonly url: string;
  private readonly onSocket: (socket?: WebSocket) => void;
  private readonly retryDelay: number;
  private cleanupFns: CleanupFn[];

  constructor(url: string, onSocket: (socket?: WebSocket) => void, retryDelay: number) {
    this.url = url;
    this.onSocket = onSocket;
    this.retryDelay = retryDelay;
    this.cleanupFns = [];
  }

  start() {
    const socket = new WebSocket(this.url);
    this.onSocket(socket);
    const onClose = (event: CloseEvent) => {
      console.warn('Socket closed', event);
      this.cleanup();
      this.retryAfterDelay();
    }
    socket.addEventListener('close', onClose);
    this.cleanupFns.unshift(() => {
      socket.removeEventListener('close', onClose);
      socket.close();
    });
  }

  private retryAfterDelay() {
    const timeout = setTimeout(() => this.start(), this.retryDelay);
    this.cleanupFns.push(() => clearTimeout(timeout));
  }

  private cleanup() {
    this.cleanupFns.forEach(fn => fn());
    this.cleanupFns = [];
  }

  stop() {
    this.cleanup();
  }

}

type CleanupFn = () => void;