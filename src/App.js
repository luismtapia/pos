import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

// user
import PageVenta from './pages/user/PageVentas';
import PageCompra from './pages/user/PageCompras';

// admin
import PageMarca from './pages/admin/PageMarca';
import PageUsuario from './pages/admin/PageUsuario';
import PageProducto from './pages/admin/PageProducto';
import PageProveedor from './pages/admin/PageProveedor';
import PageCategoria from './pages/admin/PageCategoria';

// import PageReportes from './pages/admin/PageReportes';

import PageUsuarioNuevo from './pages/admin/PageUsuarioNuevo';
// import PageProveedor from './pages/admin/PageProveedor';
import PageCategoriaNueva from './pages/admin/PageCategoriaNueva';
import PageMarcaNueva from './pages/admin/PageMarcaNueva';
// import PageReportes from './pages/admin/PageReportes';
// import PageProductoNuevo from './pages/admin/PageProductoNuevo';

// comun
import PageInicio from './pages/PageInicio';
import PageLogin from './pages/PageLogin';
import PageSignUp from './pages/PageSignUp';
import PagePOS from './pages/PagePOS';
import PageNotFound from './pages/PageNotFound';
import AppBarMenu from './components/AppBarMenu';
import MenuOtro from './components/Menu2';

// otros
import MiTema from './utils/Tema';
import { URLMarcas, URLUsuarios, URLProductos, URLCategorias, URLProveedores } from './utils/URLs';

function App() {

  return (
    <ThemeProvider theme={MiTema}>
      <Router basename='/'>
        <div>
          {/* <AppBarMenu /> */}
          <MenuOtro />
          <Routes>
            <Route path="/productos" element={<PageProducto URL={URLProductos} />} />
            <Route path="/proveedores" element={<PageProveedor URL={URLProveedores} />} />
            <Route path="/categorias" element={<PageCategoria URL={URLCategorias} />} />
            <Route path="/categoria/nueva" element={<PageCategoriaNueva URL={URLCategorias} />} />
            <Route path="/usuarios" element={<PageUsuario URL={URLUsuarios} />} />
            <Route path="/usuario/nuevo" element={<PageUsuarioNuevo URL={URLUsuarios} />} />
            <Route path="/marcas" element={<PageMarca URL={URLMarcas} />} />
            <Route path="/marca/nueva" element={<PageMarcaNueva URL={URLMarcas} />} />
            <Route path="/ventas" element={<PageVenta />} />
            <Route path="/compras" element={<PageCompra />} />
            <Route path="/inicio" element={<PageInicio />} />
            <Route path="/" element={<PagePOS />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/registro" element={<PageSignUp />} />
          </Routes>
        </div>
      </Router >
    </ThemeProvider>

  );
}

export default App;
