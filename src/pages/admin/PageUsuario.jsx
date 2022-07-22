import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';

import Busqueda from '../../components/admin/Busqueda';
import Tabla from '../../components/admin/Tabla';
import Menu from '../../components/Menu';
//utils
import { ValidateSession } from '../../auth/ValidarIdentidad';
import { getLocalStorage } from '../../auth/LocalStorage';
import { key_rol } from '../../auth/config';

const rol = getLocalStorage(key_rol);

const opciones = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
}

const columnas = [
    {
        id: 'descripcion',
        numeric: false,
        disablePadding: true,
        label: 'Descripcion',
    },
    {
        id: 'nombre',
        numeric: false,
        disablePadding: true,
        label: 'Nombre',
    },
    {
        id: 'usuario',
        numeric: false,
        disablePadding: true,
        label: 'Usuario',
    },
    {
        id: 'rol',
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

// const filas = [
//     { id: 1, descripcion: 'Otro', rol: 'user', estatus: true },
//     { id: 2, descripcion: 'Columba', rol: 'user', estatus: true },
//     { id: 3, descripcion: 'Carlos', rol: 'user', estatus: true },
//     { id: 4, descripcion: 'Aurora', rol: 'admin', estatus: true },
//     { id: 5, descripcion: 'Anna', rol: 'user', estatus: true },
//     { id: 6, descripcion: 'Cuca', rol: 'user', estatus: true },
//     { id: 7, descripcion: 'Alejandro', rol: 'admin', estatus: true },
//     { id: 8, descripcion: 'Alejandra', rol: 'user', estatus: true },

// ];

const PageUsuario = (props) => {
    const { URL } = props;

    const [filas, setFilas] = useState([]);
    const [criterioBusqueda, setCriterioBusqueda] = useState('');

    useEffect(() => {
        if (criterioBusqueda === '')
            obtenerDatos();
        else
            buscarDatos();
    }, [criterioBusqueda]);

    const obtenerDatos = async () => {
        const response = await fetch(URL, opciones);
        const datos = await response.json();
        setFilas(datos);
    };

    const buscarDatos = async () => {
        const response = await fetch(`${URL}/buscar/${criterioBusqueda}`, opciones);
        const datos = await response.json();
        setFilas(datos);
    };

    const handleOnClickBuscar = () => { buscarDatos(); };

    return (
        <div>
            <Menu rol={rol} path='usuarios' />
            <Busqueda titulo='Usuarios' busqueda='usuario' icono={<PersonIcon />}
                criterioBusqueda={criterioBusqueda} setCriterioBusqueda={setCriterioBusqueda}
                handleOnClickBuscar={handleOnClickBuscar}
            />
            <Tabla titulo='Usuarios' columnas={columnas} filas={filas} />
            {console.log(filas)}
        </div>
    );
}

export default PageUsuario;
