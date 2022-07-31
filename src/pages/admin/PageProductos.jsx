import React, { useEffect } from 'react';

import BadgeIcon from '@mui/icons-material/Badge';
import StorefrontIcon from '@mui/icons-material/Storefront';

import Busqueda from '../../components/admin/Busqueda';
import Tabla from '../../components/admin/Tabla';

import { getData } from '../../utils/Librerias';
import { opcionesGET, opcionesPUT } from '../../utils/configuracion';

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


const Pageproductos = (props) => {
    const { URL } = props;
    useEffect(() => {
        obtenerDatos();
    }, []);

    const obtenerDatos = async () => {

        const data = await getData(URL, opcionesGET);
        console.log(data);
    }
    return (
        <>
            <Busqueda icono={<StorefrontIcon />} titulo='Productos' nombre='producto' URL='/productos' />
            <Tabla titulo='Productos' columnas={columnas} filas={filas} />
        </>
    );
}

export default Pageproductos;