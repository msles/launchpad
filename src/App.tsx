import React, { useEffect, useState } from 'react';
import './App.css';
import { DrawDemo } from './components/DrawDemo';
import { Pong } from './components/pong/Pong';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminPage from './components/adminPages/AdminPage';
import DrawAdmin from './components/adminPages/DrawAdmin';
import LayoutAdmin from './components/adminPages/LayoutAdmin';
import PongAdmin from './components/adminPages/PongAdmin';
import DrawGuest from './components/guestPages/DrawGuest';
import GuestPage from './components/guestPages/GuestPage';
import LayoutGuest from './components/guestPages/LayoutGuest';
import PongGuest from './components/guestPages/PongGuest';


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


function App() {
  const socket = useWebSocket();
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/layoutAdmin" element={<LayoutAdmin />} />
        <Route path="/drawAdmin" element={<DrawAdmin />} />
        <Route path="/pongAdmin" element={<PongAdmin />} />
        
        <Route path="/guestPage" element={<GuestPage />} />
        <Route path="/layoutGuest" element={<LayoutGuest />} />
        <Route path="/drawGuest" element={<DrawGuest />} />
        <Route path="/pongGuest" element={<PongGuest />} />
          
      </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
