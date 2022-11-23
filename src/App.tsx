import './App.css';
import { useClient } from './api/hooks/useClient';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutAdmin from './components/LayoutAdmin';
import GuestPage from './components/GuestPage';
import { LayoutProvider } from './context/LayoutContext';

function App() {
  const [client, connected] = useClient();
  return connected ?
    <LayoutProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<LayoutAdmin client={client}/>} />
          <Route path="/" element={<GuestPage />} />
        </Routes>
      </BrowserRouter>
    </LayoutProvider> :
    <p>Disconnected.</p>
}

export default App;
