//----------------------------------IMPORTA---------------------------------------
//--------------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, TextField, Typography } from '@mui/material';
import CategoriaIcon from '@mui/icons-material/Class';
import useUser from '../../hooks/useUser';

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
const columnas = [
    {
        id: 'nombre',
        numeric: false,
        disablePadding: true,
        label: 'Categoria',
    }
];

const datosBusqueda = {
    titulo: 'Categorias',
    nombre: 'categoria',
    icono: <CategoriaIcon />,
}

const PageCategoria = (props) => {
    let navigate = useNavigate();



    const { URL } = props;
    // const user = useUser();
    // console.log(user);
    const [datos, setDatos] = useState([]);
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
        verificarSesion();
        if (criterioBusqueda === '') {
            obtenerDatos();

        } else
            buscarDatos();
    }, [criterioBusqueda]);

    //--------------------------------AUTENTIFICA-------------------------------------
    //--------------------------------------------------------------------------------
    // pasar a efect
    const tokenLocal = getLocalStorage(key_token);

    //console.log(tokenLocal);
    const verificarSesion = async () => {
        const data = await ValidateSession();
        if (data.token === null)
            navigate('/login', { replace: true });
        console.log("validar", data);
        setDatos(data);
        return data;
    }
    //console.log(verificarSesion);


    const obtenerDatos = async () => {
        const Authorization = getToken();
        const datos = await getData(URL, opcionesGET(Authorization));
        if (datos.error) {
            setMensajeNotificacion(`${datos.mensaje} ${datos.error}`);
            setOpenNotificacion(true);
        } else {
            // necesito mandar datos como arreglo ok
            setFilas(datos);
            setNoData(false);
        }
        setIsLoading(false);

    };

    const buscarDatos = async () => {
        const Authorization = getToken();
        setIsLoading(true);
        const endpoint = `${URL}/buscar/${criterioBusqueda}`;
        const datos = await getData(endpoint, opcionesGET(Authorization));
        if (datos.length === 0) setNoData(true);
        setFilas(datos);
        setIsLoading(false);
    };

    const handleOnClickBuscar = () => { buscarDatos(); }; // redundante y cicla ver

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
                    <Typography>{datos.sucursal}</Typography>
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


    const userData = {
        nombre: 'Luis',
        empresa: datos.empresa,
        sucursal: datos.sucursal,
        idSucursal: 's',
        rol: 'Pro',
        puesto: 'adsf',
        token: 'sds'
    }

    return (
        <UserContex.Provider value={userData}>
            <Box m={1}>
                <Busqueda titulo={datosBusqueda.titulo} nombre={datosBusqueda.nombre} icono={datosBusqueda.icono}
                    criterioBusqueda={criterioBusqueda} setCriterioBusqueda={setCriterioBusqueda}
                    handleOnClickBuscar={handleOnClickBuscar} handleClickOpenDialog={handleClickOpenDialog}
                />

                {isLoading ? <PreloaderCard /> : <PaperCard contenido={contenido} />}

                <DialogoGuardar contenido={nuevo} titulo={`Nueva ${datosBusqueda.nombre}`}
                    datos={datos}
                    handleOnClickGuargar={handleOnClickGuargar}
                    handleCloseDialog={handleCloseDialog}
                    open={openDialogGuardar}
                />

                <Notificacion mensaje={mensajeNotificacion} tipo='error' open={openNotificacion} handleClose={handleCloseNotificacion} />

            </Box>
        </UserContex.Provider>

    );
}

export default PageCategoria;
