import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';

import Busqueda from '../../components/admin/Busqueda';
import Tabla from '../../components/admin/Tabla';
import Menu from '../../components/Menu';
import Cargando from '../../components/Cargando';
import PaperCard from '../../components/PaperCard';

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

const datosBusqueda = {
    titulo: 'Usuarios',
    nombre: 'usuario',
    path: 'nuevo',
    icono: <PersonIcon />,
}
const PageUsuario = (props) => {
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
        <Tabla titulo='Usuarios' columnas={columnas} filas={filas} />
    );

    return (
        <div>
            <Menu rol={rol} path='usuarios' />
            <Busqueda titulo={datosBusqueda.titulo} nombre={datosBusqueda.nombre} path={datosBusqueda.path} icono={datosBusqueda.icono}
                criterioBusqueda={criterioBusqueda} setCriterioBusqueda={setCriterioBusqueda}
                handleOnClickBuscar={handleOnClickBuscar}
            />
            {isLoading ? <Cargando open={isLoading} /> : <PaperCard contenido={contenido} />}
        </div>
    );
}

export default PageUsuario;
