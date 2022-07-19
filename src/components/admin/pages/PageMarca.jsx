import React from 'react';

import BadgeIcon from '@mui/icons-material/Badge';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VerifiedIcon from '@mui/icons-material/Verified';

import Busqueda from '../components/Busqueda';
import Tabla from '../components/Tabla';

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

const Pagemarca = () => {
    // const [busqueda, setBusqueda] = useState(''); // criterio
    // onclick buscar aqui manejar
    return (
        <>
            <Busqueda icono={<VerifiedIcon />} titulo='Marcas' busqueda='marca' URL='/marcas' />
            <Tabla titulo='Marcas' columnas={columnas} filas={filas} />
        </>
    );
}

export default Pagemarca;
