import { createContext } from 'react';

const UserContex = createContext({
    nombre: null,
    empresa: null,
    sucursal: null,
    idSucursal: null,
    rol: null,
    puesto: null,
    token: null
});

export default UserContex;