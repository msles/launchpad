import { useState, useEffect, useMemo } from "react";
import { Client } from "../client";

export function useClient(): readonly [Client|undefined, boolean] {
  const [connected, setConnected] = useState<boolean>(false);
  const [client, setClient] = useState<Client|undefined>(undefined);
  useEffect(() => {
    const controller = new WebSocketRetry('wss://c4.jamespackard.me', socket => {
      if (socket) {
        setClient(new Client(socket));
      }
      else {
        setClient(undefined);
        setConnected(false);
      }
    }, 5_000);
    controller.onOpen(() => setConnected(true));
    controller.start();
    return () => controller.stop();
  }, []);
  useEffect(() => {
    if (client) {
      return () => client.stop();
    }
  }, [client]);
  return useMemo(() => [client, connected], [client, connected]);
}

class WebSocketRetry {

  private readonly url: string;
  private readonly onSocket: (socket?: WebSocket) => void;
  private readonly retryDelay: number;
  private cleanupFns: VoidFn[];
  private readonly openListeners: Set<VoidFn>;

  constructor(url: string, onSocket: (socket?: WebSocket) => void, retryDelay: number) {
    this.url = url;
    this.onSocket = onSocket;
    this.retryDelay = retryDelay;
    this.cleanupFns = [];
    this.openListeners = new Set();
  }

  start() {
    const socket = new WebSocket(this.url);
    this.onSocket(socket);
    const onClose = (event: CloseEvent) => {
      console.warn('Socket closed', event);
      console.debug('Retrying in', this.retryDelay, 'ms');
      this.cleanup();
      this.retryAfterDelay();
    }
    const onOpen = () => {
      console.debug('Connected');
      this.openListeners.forEach(listener => listener());
    }
    socket.addEventListener('close', onClose);
    socket.addEventListener('open', onOpen);
    this.cleanupFns.unshift(() => {
      socket.removeEventListener('close', onClose);
      socket.removeEventListener('open', onOpen);
      socket.close();
    });
  }

  private retryAfterDelay() {
    const timeout = setTimeout(() => this.start(), this.retryDelay);
    this.cleanupFns.push(() => clearTimeout(timeout));
  }

  private cleanup() {
    console.debug('Cleaning up...');
    this.cleanupFns.forEach(fn => fn());
    this.cleanupFns = [];
  }

  onOpen(listener: VoidFn): VoidFn {
    this.openListeners.add(listener);
    return () => this.openListeners.delete(listener);
  }

  stop() {
    this.cleanup();
  }

}

type VoidFn = () => void;