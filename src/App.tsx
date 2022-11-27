import './App.css';
import { useClient } from './api/hooks/useClient';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { LayoutProvider } from './context/LayoutContext';
import Admin from './components/Admin';
import { PongTest } from './components/pong/PongTest';

function App() {
  const [client, connected] = useClient();
  // todo: show toast when `connected` changes
  return <LayoutProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin client={client}/>} />
        <Route path="/" element={<Home client={client} />} />
        <Route path="/pong-test" element={<PongTest/>} />
      </Routes>
    </BrowserRouter>
  </LayoutProvider>
}

export default App;
