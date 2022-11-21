import React, { useEffect, useState } from 'react';
import './App.css';
import { DrawDemo } from './components/DrawDemo';
import { Pong } from './components/pong/Pong';
import { useClient } from './api/hooks/useClient';
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
import { LayoutProvider } from './context/LayoutContext';

function App() {
  const client = useClient();
  return client ?
    <LayoutProvider client={client}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/layoutAdmin" element={<LayoutAdmin client={client}/>} />
        <Route path="/drawAdmin" element={<DrawAdmin />} />
        <Route path="/pongAdmin" element={<PongAdmin />} />
        
        <Route path="/guestPage" element={<GuestPage />} />
        <Route path="/layoutGuest" element={<LayoutGuest />} />
        <Route path="/drawGuest" element={<DrawGuest />} />
        <Route path="/pongGuest" element={<PongGuest />} />
          
      </Routes>
      </BrowserRouter>
    </LayoutProvider> :
    <p>Disconnected.</p>
}

export default App;
