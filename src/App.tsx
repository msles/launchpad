import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { DrawDemo } from './DrawDemo';
import { Pong } from './pong/Pong';

function App() {
  // const socket = useWebSocket();
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
      {/*socket && <DrawDemo socket={socket}/>*/}
      <Pong/>
    </div>
  );
}

function useWebSocket(): WebSocket|undefined {
  const [socket, setSocket] = useState<WebSocket|undefined>();
  useEffect(() => {
    const s = new WebSocket('ws://localhost:8000');
    s.addEventListener('open', () => setSocket(s));
  }, []);
  return socket;
}

export default App;
