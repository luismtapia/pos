import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

import Busqueda from '../components/Busqueda';
import Tabla from '../components/Tabla';

const columnas = [
    {
        id: 'descripcion',
        numeric: false,
        disablePadding: true,
        label: 'Descripcion',
    },
    {
        id: 'permiso',
        numeric: false,
        disablePadding: false,
        label: 'Permiso',
    },
    {
        id: 'estatus',
        numeric: false,
        disablePadding: false,
        label: 'Estatus',
    }
];

const filas = [
    { id: 1, descripcion: 'Otro', permiso: 'user', estatus: 'activo' },
    { id: 2, descripcion: 'Columba', permiso: 'user', estatus: 'activo' },
    { id: 3, descripcion: 'Carlos', permiso: 'user', estatus: 'activo' },
    { id: 4, descripcion: 'Aurora', permiso: 'admin', estatus: 'activo' },
    { id: 5, descripcion: 'Anna', permiso: 'user', estatus: 'activo' },
    { id: 6, descripcion: 'Cuca', permiso: 'user', estatus: 'activo' },
    { id: 7, descripcion: 'Alejandro', permiso: 'admin', estatus: 'activo' },
    { id: 8, descripcion: 'Alejandra', permiso: 'user', estatus: 'activo' },

];

const PageUsuario = () => {

    return (
        <div>
            <Busqueda titulo='Usuarios' busqueda='usuario' icono={<PersonIcon />} URL='/usuarios' fila={filas}
                criterio={3} />
            <Tabla titulo='Usuarios' columnas={columnas} filas={filas} />
        </div>
    );
}

export default PageUsuario;
