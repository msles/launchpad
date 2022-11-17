export class Client {

  private readonly socket: WebSocket;
  private readonly modes: Map<string|undefined, Mode>;
  private readonly cleanup: () => void;

  constructor(socket: WebSocket) {
    this.socket = socket;
    this.modes = new Map();
    const messageHandler = (message: MessageEvent<string>) => this.onMessage(message);
    this.socket.addEventListener('message', messageHandler);
    this.cleanup = () => {
      this.socket.removeEventListener('message', messageHandler);
    }
  }

  private onMessage(msg: MessageEvent<string>) {
    const {mode: modeName, channel, message} = JSON.parse(msg.data) as ChannelMessage;
    const mode = this.mode(modeName);
    mode.channel(channel).emit(message);
  }

  private send(message: unknown, channel: string, mode?: string) {
    this.socket.send(JSON.stringify({mode, channel, message}));
  }

  mode(name: string|undefined): Mode {
    if (this.modes.has(name)) {
      return this.modes.get(name)!;
    }
    else {
      const mode = new Mode((channel, message) => this.send(message, channel, name));
      this.modes.set(name, mode);
      return mode;
    }
  }

  stop() {
    this.cleanup();
  }

  channel<T>(name: string): Channel<T> {
    return this.mode(undefined).channel(name);
  }

}

type MessageListener<T> = (message: T) => void;

class Channel<T> {

  private readonly listeners: Set<MessageListener<T>>
  private readonly sendMessage: (message: T) => void;

  constructor(sendMessage: (message: T) => void) {
    this.listeners = new Set();
    this.sendMessage = sendMessage;
  }

  subscribe(listener: MessageListener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit(message: T): void {
    this.listeners.forEach(listener => listener(message));
  }

  send(message: T): void {
    this.sendMessage(message);
  }

}

class Mode {

  private readonly channels: Map<string, Channel<unknown>>;
  private readonly send: (channel: string, message: unknown) => void;

  constructor(send: (channel: string, message: unknown) => void) {
    this.channels = new Map();
    this.send = send;
  }

  emit(channelName: string, message: unknown): void {
    const channel = this.channel(channelName);
    channel.emit(message);
  }

  channel<T>(name: string): Channel<T> {
    if (this.channels.has(name)) {
      return this.channels.get(name) as Channel<T>;
    }
    else {
      const channel = new Channel<unknown>(message => this.send(name, message));
      this.channels.set(name, channel);
      return channel as Channel<T>;
    }
  }

}

type ChannelMessage<T = unknown> = {
  mode?: string,
  channel: string,
  message: T
}