import './App.css';
import { useClient } from './api/hooks/useClient';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import GuestPage from './components/GuestPage';
import { LayoutProvider } from './context/LayoutContext';

function App() {
  const [client, connected] = useClient();
  // todo: show toast when `connected` changes
  return <LayoutProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Layout client={client}/>} />
        <Route path="/" element={<GuestPage />} />
      </Routes>
    </BrowserRouter>
  </LayoutProvider>
}

export default App;
