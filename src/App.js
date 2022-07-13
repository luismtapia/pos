import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Menu from './components/usuario/Menu';
import Venta from './components/usuario/venta';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <Router basename='/'>
        <div>
          <Menu />
          <Routes>
            <Route path="/ventas" element={<Venta />} />
            <Route path="/" element={<Inicio />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router >
    </>

  );
}

function Inicio() {
  return <h2>Inicio</h2>;
}
export default App;
