//----------------------------------IMPORTA---------------------------------------
//--------------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, TextField, Typography } from '@mui/material';
import CategoriaIcon from '@mui/icons-material/Class';
import usePage from '../../hooks/usePage';

import Busqueda from '../../components/admin/Busqueda';
import Tabla from '../../components/admin/Tabla';
import PaperCard from '../../components/PaperCard';
import NotFound from '../../components/NotFound';
import Notificacion from '../../components/Notificacion';
import PreloaderCard from '../../components/PreloaderCard';
import DialogoGuardar from '../../components/DialogoGuardar';

import { getLocalStorage } from '../../auth/LocalStorage';
import { getToken, key_token, URLAuth } from '../../utils/configuracion';

import { getData } from '../../utils/Librerias';
import { opcionesGET, opcionesPOST } from '../../utils/configuracion';

import UserContex from '../../context/UserContext';
import { ValidateSession } from '../../auth/ValidarIdentidad';

//-----------------------------------CÓDIGO---------------------------------------
//--------------------------------------------------------------------------------
const PageCRUD = (props) => {
    const { contenidoCrear, openDialogGuardar, handleClickOpenDialogGuardar, handleCloseDialogGuardar, handleOnClickGuargar, criterioInicial } = props;
    const { endpoint, nombre } = usePage();

    // sin contextoPage
    let navigate = useNavigate();


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
        if (criterioBusqueda === '') {
            obtenerDatos();
        } else
            buscarDatos();
    }, [criterioBusqueda, criterioInicial]);




    //-----------------------------------CÓDIGO---------------------------------------
    //--------------------------------------------------------------------------------
    const obtenerDatos = async () => {
        const Authorization = getToken();
        const datos = await getData(endpoint, opcionesGET(Authorization));

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
        setIsLoading(true);
        const Authorization = getToken();
        const endpointBuscar = `${endpoint}/buscar/${criterioBusqueda}`;
        const datos = await getData(endpointBuscar, opcionesGET(Authorization));
        if (datos.length === 0) setNoData(true);
        setFilas(datos);
        setIsLoading(false);
    };

    const handleOnClickBuscar = () => { buscarDatos(); }; // redundante y cicla ver

    const contenido = (<>{noData ? <NotFound /> : <Tabla filas={filas} />}</>);

    return (
        <Box m={1}>
            <Busqueda criterioBusqueda={criterioBusqueda} setCriterioBusqueda={setCriterioBusqueda}
                handleOnClickBuscar={handleOnClickBuscar} handleClickOpenDialog={handleClickOpenDialogGuardar}
            />

            {isLoading ? <PreloaderCard /> : <PaperCard contenido={contenido} />}

            <DialogoGuardar contenido={contenidoCrear} titulo={`Nueva ${nombre}`}
                handleOnClickGuargar={handleOnClickGuargar}
                handleCloseDialog={handleCloseDialogGuardar}
                open={openDialogGuardar}
            />

            <Notificacion mensaje={mensajeNotificacion} tipo='error' open={openNotificacion} handleClose={handleCloseNotificacion} />

        </Box>
    );
}

export default PageCRUD;
