import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Inicio } from './pages/Inicio';
import { Conferencias } from './pages/Conferencias';
import { Bibliografia } from './pages/Bibliografia';
import { Avaliacao } from './pages/Avaliacao';

import { ConferenceReader } from './components/ConferenceReader';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="conferencias" element={<Conferencias />}>
          <Route path=":moduloId/:conferenciaId" element={<ConferenceReader />} />
        </Route>
        <Route path="bibliografia" element={<Bibliografia />} />
        <Route path="avaliacao" element={<Avaliacao />} />
      </Route>
    </Routes>
  );
}

export default App;
