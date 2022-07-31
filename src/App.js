import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

//-----------------------------PAGINAS EMPLEADO-------------------------------------
import PageVenta from './pages/user/PageVentas';
import PageCompra from './pages/user/PageCompras';

//-----------------------------PAGINAS ADMIN-------------------------------------
import PageMarcas from './pages/admin/PageMarcas';
import PageUsuarios from './pages/admin/PageUsuarios';
import PageProductos from './pages/admin/PageProductos';
import PageProveedores from './pages/admin/PageProveedores';
import PageCategorias from './pages/admin/PageCategorias';


//-----------------------------PAGINAS COMUNES-------------------------------------
import PageInicio from './pages/PageInicio';
import PageLogin from './pages/PageLogin';
import PageSignUp from './pages/PageSignUp';
import PagePerfil from './pages/PagePerfil';
import PageCuenta from './pages/PageCuenta';
import PagePOS from './pages/PagePOS';
import PageNotFound from './pages/PageNotFound';
import AppBarMenu from './components/AppBarMenu';

// otros
import MiTema from './utils/Tema';
import { URLMarcas, URLUsuarios, URLProductos, URLCategorias, URLProveedores, URLSesiones } from './utils/configuracion';

function App() {

  return (
    <ThemeProvider theme={MiTema}>
      <Router basename='/'>
        <div>
          <AppBarMenu />
          <Routes>
            <Route path="/productos" element={<PageProductos URL={URLProductos} />} />
            <Route path="/proveedores" element={<PageProveedores URL={URLProveedores} />} />
            <Route path="/categorias" element={<PageCategorias URL={URLCategorias} />} />
            <Route path="/usuarios" element={<PageUsuarios URL={URLUsuarios} />} />
            <Route path="/marcas" element={<PageMarcas URL={URLMarcas} />} />
            <Route path="/ventas" element={<PageVenta />} />
            <Route path="/compras" element={<PageCompra />} />
            <Route path="/inicio" element={<PageInicio />} />
            {/* menus user */}
            <Route path="/perfil" element={<PagePerfil URL={URLUsuarios} />} />
            <Route path="/cuenta" element={<PageCuenta URL={URLUsuarios} />} />
            <Route path="/" element={<PagePOS />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/registro" element={<PageSignUp URL={URLSesiones} />} />
          </Routes>
        </div>
      </Router >
    </ThemeProvider>
  );
}

export default App;
