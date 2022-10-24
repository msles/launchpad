import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { DrawDemo } from './DrawDemo';

function App() {
  // const socket = useWebSocket();
  return (
    <div className="App">
      <header className="App-header">
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
