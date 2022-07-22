import React from 'react';

import BadgeIcon from '@mui/icons-material/Badge';
import StorefrontIcon from '@mui/icons-material/Storefront';

import Busqueda from '../../components/admin/Busqueda';
import Tabla from '../../components/admin/Tabla';
import Menu from '../../components/Menu';

import { getLocalStorage } from '../../auth/LocalStorage';
import { key_rol } from '../../auth/config';

const columnas = [
    {
        id: 'codigo',
        numeric: false,
        disablePadding: true,
        label: 'Código',
    },
    {
        id: 'descripcion',
        numeric: false,
        disablePadding: true,
        label: 'Artículo',
    },
    {
        id: 'marca',
        numeric: false,
        disablePadding: false,
        label: 'Marca',
    },
    {
        id: 'modelo',
        numeric: false,
        disablePadding: false,
        label: 'Modelo',
    },
    {
        id: 'codigoBarras',
        numeric: false,
        disablePadding: false,
        label: 'Código de Barras',
    },
    {
        id: 'unidad',
        numeric: false,
        disablePadding: false,
        label: 'Presentación',
    },
    {
        id: 'precioCompra',
        numeric: false,
        disablePadding: false,
        label: 'Precio de Compra',
    },
    {
        id: 'precioVenta',
        numeric: false,
        disablePadding: false,
        label: 'Precio de Venta',
    },
    {
        id: 'stock',
        numeric: false,
        disablePadding: false,
        label: 'Stock',
    },
    {
        id: 'categoria',
        numeric: false,
        disablePadding: false,
        label: 'Categoria',
    }
];

const filas = [
    { id: 1, codigo: '1', descripcion: 'Salsa', marca: 'San Luis', modelo: 'Liquido', codigoBarras: '0654587549598', unidad: 'Litros', precioCompra: 9.00, precioVenta: 18.00, stock: 15, categoria: 'Enlatados' },
    { id: 2, codigo: '2', descripcion: 'Jitomates', marca: 'San Luis', modelo: 'Liquido', codigoBarras: '0654587549598', unidad: 'Litros', precioCompra: 9.00, precioVenta: 18.00, stock: 12, categoria: 'Refresco' }

];


const Pageproductos = () => {

    return (
        <>
            <Menu rol={getLocalStorage(key_rol)} path='proveedores' />
            <Busqueda icono={<StorefrontIcon />} titulo='Productos' busqueda='producto' URL='/productos' />
            <Tabla titulo='Productos' columnas={columnas} filas={filas} />
        </>
    );
}

export default Pageproductos;
