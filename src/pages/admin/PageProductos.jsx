
//----------------------------------IMPORTA---------------------------------------
//--------------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, TextField, Typography } from '@mui/material';
import ProductoIcon from '@mui/icons-material/Storefront';

import PageCRUD from './PageCRUD';
import Notificacion from '../../components/Notificacion';
import PageContex from '../../context/PageContext';

import { getToken, opcionesPOST, URLProductos } from '../../utils/configuracion';
import { getData } from '../../utils/Librerias';
import { ValidateSession } from '../../auth/ValidarIdentidad';

const columnas = [
    {
        id: '_id',
        numeric: false,
        disablePadding: true,
        label: 'Código',
    },
    {
        id: 'nombre',
        numeric: false,
        disablePadding: true,
        label: 'Artículo',
    },
    {
        id: 'idMarca',
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
        id: 'idCategoria',
        numeric: false,
        disablePadding: false,
        label: 'Categoria',
    }
];


const PageProductos = () => {
    const [usuario, setUsuario] = useState([]);
    const [criterioInicial, setCriterioInicial] = useState('');

    let navigate = useNavigate();

    //--------------------------------AUTENTIFICA-------------------------------------
    //--------------------------------------------------------------------------------
    useEffect(() => {
        verificarSesion();
    }, []);

    const verificarSesion = async () => {
        ValidateSession()
            .then((response) => {
                if (!response.idUsuario) {
                    navigate('/login', { replace: true });
                }
                setUsuario({
                    sucursal: response.sucursal,
                    idSucursal: response.idSucursal
                });
            })
            .catch((error) => { console.error(error); });
    };

    // ----------------------DIALOGO GUARDAR----------------------
    const [openNotificacionGuardar, setOpenNotificacionGuardar] = useState(false);
    const [openDialogGuardar, setOpenDialogGuardar] = useState(false);
    const handleCloseDialogGuardar = () => { setOpenDialogGuardar(false); };
    const handleClickOpenDialogGuardar = () => { setOpenDialogGuardar(true); };
    const handleCloseNotificacionGuardar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenNotificacionGuardar(false);
    };

    const [descripcionTextfield, setDescripcionTextfield] = useState('');
    const handleOnChangeDescripcionTextfield = (e) => { setDescripcionTextfield(e.target.value) };

    const handleOnClickGuargar = async () => {
        if (descripcionTextfield === '') {
            setOpenNotificacionGuardar(true);
        } else {
            const Authorization = getToken();
            const datos = await getData(URLProductos, opcionesPOST(Authorization, { nombre: descripcionTextfield, idSucursal: usuario.idSucursal }));
            handleCloseDialogGuardar();
            console.log(datos);
            setCriterioInicial(descripcionTextfield);
        }
    }

    const crear = (
        <Box>
            <Stack m={2} mt={3}
                spacing={{ xs: 2, sm: 2, md: 4 }}
                justifyContent='space-evenly'
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography>{usuario.sucursal}</Typography>
                </Box>

                <TextField id="descripcion" label="Descripción" variant="outlined" onChange={handleOnChangeDescripcionTextfield} />
            </Stack>
            <Notificacion open={openNotificacionGuardar} mensaje='Los campos no pueden estar vacios' tipo='warning' handleClose={handleCloseNotificacionGuardar} />
        </Box>
    );

    return (
        <PageContex.Provider
            value={{
                endpoint: URLProductos,
                titulo: 'Productos',
                nombre: 'producto',
                icono: <ProductoIcon />,
                columnas: columnas
            }}>
            <PageCRUD contenidoCrear={crear}
                handleOnClickGuargar={handleOnClickGuargar}
                handleCloseDialogGuardar={handleCloseDialogGuardar}
                handleClickOpenDialogGuardar={handleClickOpenDialogGuardar}
                openDialogGuardar={openDialogGuardar}
                criterioInicial={criterioInicial}
            />
        </PageContex.Provider>
    );
}

export default PageProductos;