import React, { useState, useEffect } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';

import Busqueda from '../../components/admin/Busqueda';
import Tabla from '../../components/admin/Tabla';
import Menu from '../../components/Menu';
import Cargando from '../../components/Cargando';
import PaperCard from '../../components/PaperCard';

import { getLocalStorage } from '../../auth/LocalStorage';
import { key_rol, key_token } from '../../auth/config';

const tokenLocal = getLocalStorage(key_token);

const opciones = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenLocal}`
    }
}

const columnas = [
    {
        id: 'descripcion',
        numeric: false,
        disablePadding: true,
        label: 'Marca',
    },
    {
        id: 'estado',
        numeric: false,
        disablePadding: false,
        label: 'Estado',
    },
    {
        id: 'fecha_alta',
        numeric: false,
        disablePadding: false,
        label: 'Fecha',
    }
];

const filas = [
    { id: 1, descripcion: 'Otro', estado: 'activo', fecha_alta: '2021-05-12' },
    { id: 2, descripcion: 'Luis', estado: 'activo', fecha_alta: '2021-05-12' },
    { id: 3, descripcion: 'Manuel', estado: 'activo', fecha_alta: '2021-05-12' },
    { id: 4, descripcion: 'Pablo', estado: 'inactivo', fecha_alta: '2021-05-12' },
    { id: 5, descripcion: 'Javier', estado: 'activo', fecha_alta: '2021-05-12' },
    { id: 6, descripcion: 'Cuca', estado: 'activo', fecha_alta: '2021-05-12' },
    { id: 7, descripcion: 'Alejandro', estado: 'inactivo', fecha_alta: '2021-05-12' },
    { id: 8, descripcion: 'Daniel', estado: 'activo', fecha_alta: '2021-05-12' },

];

const datosBusqueda = {
    titulo: 'Marcas',
    nombre: 'marca',
    path: 'nueva',
    icono: <VerifiedIcon />,
}

const Pagemarca = (props) => {
    const { URL } = props;
    const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
    };

    const buscarDatos = async () => {
        const response = await fetch(`${URL}/buscar/${criterioBusqueda}`, opciones);
        const datos = await response.json();
        setFilas(datos);
    };

    const handleOnClickBuscar = () => { buscarDatos(); };

    const contenido = (
        <Tabla titulo={datosBusqueda.titulo} columnas={columnas} filas={filas} />
    );

    return (
        <>
            <Menu rol={getLocalStorage(key_rol)} path='marcas' />
            <Busqueda titulo={datosBusqueda.titulo} nombre={datosBusqueda.nombre} path={datosBusqueda.path} icono={datosBusqueda.icono}
                criterioBusqueda={criterioBusqueda} setCriterioBusqueda={setCriterioBusqueda}
                handleOnClickBuscar={handleOnClickBuscar}
            />
            {isLoading ? <Cargando open={isLoading} /> : <PaperCard contenido={contenido} />}
        </>
    );
}

export default Pagemarca;
