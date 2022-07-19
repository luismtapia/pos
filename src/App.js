import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';

// user
import Menu from './components/comun/components/Menu';
import PageVenta from './components/usuario/pages/PageVentas';
import PageCompra from './components/usuario/pages/PageCompras';
import PageNotFound from './components/comun/pages/PageNotFound';
// admin
import PageUsuario from './components/admin/pages/PageUsuario';
import PageProveedor from './components/admin/pages/PageProveedor';
import PageCategoria from './components/admin/pages/PageCategoria';
import PageMarca from './components/admin/pages/PageMarca';
// import PageReportes from './components/admin/pages/PageReportes';
import PageProducto from './components/admin/pages/PageProducto';

import PageUsuarioNuevo from './components/admin/pages/PageUsuarioNuevo';
// import PageProveedor from './components/admin/pages/PageProveedor';
// import PageCategoria from './components/admin/pages/PageCategoria';
// import PageMarca from './components/admin/pages/PageMarca';
// import PageReportes from './components/admin/pages/PageReportes';
// import PageProducto from './components/admin/pages/PageProducto';

// comun
import PageInicio from './components/comun/pages/PageInicio';
import PageLogin from './components/comun/pages/PageLogin';
import PageSignUp from './components/comun/pages/PageSignUp';
import PagePOS from './components/comun/pages/PagePOS';

// otros
import Validar from './auth/ValidarIdentidad';
import MiTema from './utils/Tema';

function App() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const sesion = Validar(usuario, contraseña);
  console.log(sesion);

  return (
    <ThemeProvider theme={MiTema}>
      <Router basename='/'>
        <div>
          {
            sesion.permiso === 'permitido' ? <Menu auth={sesion} /> : <></>
          }
          <Routes>
            <Route path="/productos" element={<PageProducto />} />
            <Route path="/proveedores" element={<PageProveedor />} />
            <Route path="/categorias" element={<PageCategoria />} />
            <Route path="/usuarios" element={<PageUsuario />} />
            <Route path="/usuario/nuevo" element={<PageUsuarioNuevo URL='/api' />} />
            <Route path="/marcas" element={<PageMarca />} />
            <Route path="/ventas" element={<PageVenta />} />
            <Route path="/compras" element={<PageCompra />} />
            <Route path="/inicio" element={<PageInicio auth={sesion} />} />
            <Route path="/" element={<PagePOS auth={sesion} />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/login" element={<PageLogin usuario={usuario} contraseña={contraseña} setUsuario={setUsuario} setContraseña={setContraseña} />} />
            <Route path="/registro" element={<PageSignUp usuario={usuario} contraseña={contraseña} setUsuario={setUsuario} setContraseña={setContraseña} />} />
          </Routes>
        </div>
      </Router >
    </ThemeProvider>

  );
}

export default App;
