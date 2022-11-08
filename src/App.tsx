import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { DrawDemo } from './DrawDemo';
import { Pong } from './pong/Pong';

function App() {
  const socket = useWebSocket();
  return (
    <div className="App">
      <header className="App-header">
        <h1>M.S.L.E.S.</h1> 
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {socket && <DrawDemo socket={socket}/>}
      {/*<Pong/>*/}
    </div>
  );
}

function useWebSocket(): WebSocket|undefined {
  const [socket, setSocket] = useState<WebSocket|undefined>();
  useEffect(() => {
    const s = new WebSocket('wss://c4.jamespackard.me');
    let clearPingInterval = () => {};
    function onOpen() {
      setSocket(s);
      console.debug('WebSocket connection established');
      const interval = setInterval(() => s.send(JSON.stringify({channel: 'ping'})), 5_000);
      clearPingInterval = () => clearInterval(interval);
    }
    function onClose(event: CloseEvent) {
      console.debug('WebSocket connection closed');
      console.debug(event);
    }
    function onMessage(event: MessageEvent) {
      console.debug(event.data);
    }
    s.addEventListener('open', onOpen);
    s.addEventListener('close', onClose);
    s.addEventListener('message', onMessage);
    return () => {
      clearPingInterval();
      s.removeEventListener('open', onOpen);
      s.removeEventListener('close', onClose);
      s.removeEventListener('message', onMessage);
      s.close();
    }
  }, []);
  return socket;
}

export default App;
