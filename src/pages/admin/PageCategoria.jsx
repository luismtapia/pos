import React, { useState, useEffect } from 'react';

import ClassIcon from '@mui/icons-material/Class';

import Busqueda from '../../components/admin/Busqueda';
import Tabla from '../../components/admin/Tabla';
import Menu from '../../components/Menu';
import Cargando from '../../components/Cargando';
import PaperCard from '../../components/PaperCard';

import { getLocalStorage } from '../../auth/LocalStorage';
import { key_rol, key_token } from '../../auth/config';

const columnas = [
    {
        id: 'nombre',
        numeric: false,
        disablePadding: true,
        label: 'Categoria',
    }
];

const tokenLocal = getLocalStorage(key_token);

const opciones = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenLocal}`
    }
}

const datosBusqueda = {
    titulo: 'Categorias',
    nombre: 'categoria',
    path: 'nueva',
    icono: <ClassIcon />,
}

const PageCategoria = (props) => {
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
            <Menu rol={getLocalStorage(key_rol)} path='categorias' />
            <Busqueda titulo={datosBusqueda.titulo} nombre={datosBusqueda.nombre} path={datosBusqueda.path} icono={datosBusqueda.icono}
                criterioBusqueda={criterioBusqueda} setCriterioBusqueda={setCriterioBusqueda}
                handleOnClickBuscar={handleOnClickBuscar}
            />
            {isLoading ? <Cargando open={isLoading} /> : <PaperCard contenido={contenido} />}

        </>
    );
}

export default PageCategoria;
