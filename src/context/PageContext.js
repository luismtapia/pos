import { createContext } from 'react';

const PageContex = createContext({
    endpoint: null,
    titulo: null,
    nombre: null,
    icono: null,
    sucursal: null,
    columnas: null
});

export default PageContex;