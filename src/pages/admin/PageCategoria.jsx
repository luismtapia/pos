import React from 'react';

import BadgeIcon from '@mui/icons-material/Badge';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import VerifiedIcon from '@mui/icons-material/Verified';

import Busqueda from '../../components/admin/Busqueda';
import Tabla from '../../components/admin/Tabla';
import Menu from '../../components/Menu';

import { getLocalStorage } from '../../auth/LocalStorage';
import { key_rol } from '../../auth/config';

const columnas = [
    {
        id: 'descripcion',
        numeric: false,
        disablePadding: true,
        label: 'Marca',
    }
];

const filas = [
    { id: 1, descripcion: 'Refresco' },
    { id: 2, descripcion: 'Otro' },
    { id: 3, descripcion: 'Sabritas' },
    { id: 4, descripcion: 'Enlatados' },
    { id: 5, descripcion: 'Frios' },
    { id: 6, descripcion: 'Tortillas' },
    { id: 7, descripcion: 'Pan' },
    { id: 8, descripcion: 'mas' },

];

const PageCategoria = () => {
    // const [busqueda, setBusqueda] = useState(''); // criterio
    // onclick buscar aqui manejar
    return (
        <>
            <Menu rol={getLocalStorage(key_rol)} path='proveedores' />
            <Busqueda icono={<VerifiedIcon />} titulo='Categorias' busqueda='categoria' URL='/categorias' />
            <Tabla titulo='Categorias' columnas={columnas} filas={filas} />
        </>
    );
}

export default PageCategoria;
