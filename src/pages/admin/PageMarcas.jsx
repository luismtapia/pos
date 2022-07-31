import React, { useState, useEffect } from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import MarcaIcon from '@mui/icons-material/Verified';

import Busqueda from '../../components/admin/Busqueda';
import Tabla from '../../components/admin/Tabla';
import PaperCard from '../../components/PaperCard';
import NotFound from '../../components/NotFound';
import Notificacion from '../../components/Notificacion';
import PreloaderCard from '../../components/PreloaderCard';
import DialogoGuardar from '../../components/DialogoGuardar';

import { getLocalStorage } from '../../auth/LocalStorage';
import { key_rol, key_token } from '../../utils/configuracion';

import { getData } from '../../utils/Librerias';
import { opcionesGET, opcionesPOST } from '../../utils/configuracion';

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
        id: 'nombre',
        numeric: false,
        disablePadding: true,
        label: 'Marca',
    },
    {
        id: 'fecha_alta',
        numeric: false,
        disablePadding: false,
        label: 'Fecha',
    }
];



const datosBusqueda = {
    titulo: 'Marcas',
    nombre: 'marca',
    icono: <MarcaIcon />,
}

const PageMarca = (props) => {
    const { URL } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [noData, setNoData] = useState(true);
    const [openNotificacion, setOpenNotificacion] = useState(false);
    const [mensajeNotificacion, setMensajeNotificacion] = useState('');
    const handleCloseNotificacion = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenNotificacion(false);
    };

    const [filas, setFilas] = useState([]);
    const [criterioBusqueda, setCriterioBusqueda] = useState('');

    useEffect(() => {
        if (criterioBusqueda === '')
            obtenerDatos();
        else
            buscarDatos();
    }, [criterioBusqueda]);

    const obtenerDatos = async () => {
        const datos = await getData(URL, opcionesGET());
        // setUsuario(datos[0]);

        console.log(datos);
        if (datos.error) {
            setMensajeNotificacion(`${datos.mensaje} ${datos.error}`);
            setOpenNotificacion(true);
        } else {
            setFilas(datos);
            setNoData(false);
        }
        setIsLoading(false);

    };

    const buscarDatos = async () => {
        const response = await fetch(`${URL}/buscar/${criterioBusqueda}`, opciones);
        const datos = await response.json();
        setFilas(datos);
    };

    const handleOnClickBuscar = () => { buscarDatos(); };

    // ----------------------DIALOGO GUARDAR----------------------

    const [openNotificacionGuardar, setOpenNotificacionGuardar] = useState(false);
    const [openDialogGuardar, setOpenDialogGuardar] = useState(false);
    const handleCloseDialog = () => { setOpenDialogGuardar(false); };
    const handleClickOpenDialog = () => { setOpenDialogGuardar(true); };
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
            const datos = await getData(URL, opcionesPOST({ nombre: descripcionTextfield, idSucursal: 'sucursalid' }));
            handleCloseDialog();
            setCriterioBusqueda(descripcionTextfield);
        }
    }

    const nuevo = (
        <Box>
            <Stack m={2} mt={3}
                spacing={{ xs: 2, sm: 2, md: 4 }}
                justifyContent='space-evenly'
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography>Sucursal</Typography>
                </Box>

                <TextField id="descripcion" label="Descripción" variant="outlined" onChange={handleOnChangeDescripcionTextfield} />
            </Stack>
            <Notificacion open={openNotificacionGuardar} mensaje='Los campos no pueden estar vacios' tipo='warning' handleClose={handleCloseNotificacionGuardar} />
        </Box>
    );
    const contenido = (
        <>
            {
                noData ? <NotFound /> : <Tabla titulo={datosBusqueda.titulo} columnas={columnas} filas={filas} />
            }
        </>
    );

    return (
        <Box m={1}>
            <Busqueda titulo={datosBusqueda.titulo} nombre={datosBusqueda.nombre} icono={datosBusqueda.icono}
                criterioBusqueda={criterioBusqueda} setCriterioBusqueda={setCriterioBusqueda}
                handleOnClickBuscar={handleOnClickBuscar} handleClickOpenDialog={handleClickOpenDialog}
            />

            {isLoading ? <PreloaderCard /> : <PaperCard contenido={contenido} />}

            <DialogoGuardar contenido={nuevo} titulo={`Nueva ${datosBusqueda.nombre}`}
                handleOnClickGuargar={handleOnClickGuargar}
                handleCloseDialog={handleCloseDialog}
                open={openDialogGuardar}
            />

            <Notificacion mensaje={mensajeNotificacion} tipo='error' open={openNotificacion} handleClose={handleCloseNotificacion} />

        </Box >
    );
}

export default PageMarca;
