import { Observable, Subject } from "rxjs";
import { Layout } from "./layout";
import { ModeType } from "./mode";

export interface Client {

  readonly layout: ObservableValue<Layout,[]>;
  readonly currentMode: ObservableValue<ModeType,undefined>

  mode(name: string|undefined): Mode;
  channel<T>(name: string): Channel<T>;
  stop(): void;

}

export class WebClient implements Client {

  private readonly socket: WebSocket;
  private readonly modes: Map<string|undefined, Mode>;
  private readonly cleanup: () => void;
  public readonly layout: ObservableValue<Layout,[]>;
  public readonly currentMode: ObservableValue<ModeType, undefined>

  constructor(socket: WebSocket) {
    this.socket = socket;
    this.modes = new Map();
    const modeSubject = new Subject<ModeType>();
    const layoutSubject = new Subject<Layout>();
    const unsubscribeMode = this.channel<ModeType>('mode').subscribe(name => modeSubject.next(name));
    const unsubscribeLayout = this.channel<Layout>('layout').subscribe(layout => layoutSubject.next(layout));
    this.layout = new ObservableValue([], layoutSubject);
    this.currentMode = new ObservableValue(undefined, modeSubject);
    const messageHandler = (message: MessageEvent<string>) => this.onMessage(message);
    this.socket.addEventListener('message', messageHandler);
    this.cleanup = () => {
      unsubscribeMode();
      unsubscribeLayout();
      this.socket.removeEventListener('message', messageHandler);
    }
  }

  private onMessage(msg: MessageEvent<string>) {
    const {mode: modeName, channel, message} = JSON.parse(msg.data) as ChannelMessage;
    const mode = this.mode(modeName);
    mode.channel(channel).emit(message);
  }

  private send(message: unknown, channel: string, mode?: string) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({mode, channel, message}));
    }
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
    this.modes.clear();
    this.cleanup();
  }

  channel<T>(name: string): Channel<T> {
    return this.mode(undefined).channel(name);
  }

}

class ObservableValue<T,Default=T> {

  public latest: T|Default;
  public readonly observable: Observable<T>;

  constructor(def: Default, source: Observable<T>) {
    this.latest = def;
    this.observable = source;
    this.observable.subscribe(val => {
      this.latest = val;
    });
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

export class DisconnectedClient implements Client {

  currentMode: ObservableValue<ModeType, undefined> = new ObservableValue(undefined, new Subject());
  layout: ObservableValue<Layout, []> = new ObservableValue([], new Subject());

  mode(): Mode {
    return new Mode(() => {})
  }

  channel<T>(): Channel<T> {
      return new Channel(() => {});
  }

  stop(): void {
    // nothing to do
  }

}

type ChannelMessage<T = unknown> = {
  mode?: string,
  channel: string,
  message: T
}