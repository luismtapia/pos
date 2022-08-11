//----------------------------------IMPORTA---------------------------------------
//--------------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, TextField, Typography } from '@mui/material';
import ProveedorIcon from '@mui/icons-material/Badge';

import PageCRUD from './PageCRUD';
import Notificacion from '../../components/Notificacion';
import PageContex from '../../context/PageContext';
import AutoCompletar from '../../components/AutoCompletar';
import Nuevo from '../../components/Nuevo';

import { getToken, opcionesPOST, URLMarcas, URLProveedores } from '../../utils/configuracion';
import { getData } from '../../utils/Librerias';
import { ValidateSession } from '../../auth/ValidarIdentidad';


const columnas = [
    {
        id: 'nombre',
        numeric: false,
        disablePadding: true,
        label: 'Proveedor',
    },
    {
        id: 'marcas',
        numeric: false,
        disablePadding: false,
        label: 'Marcas',
    }
];

const PageProveedores = () => {
    const [usuario, setUsuario] = useState([]);
    const [criterioInicial, setCriterioInicial] = useState('');
    const [marcas, setMarcas] = useState([]);

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
            //aqui guardo marcas ids y abajo
            const idsMarcas = marcas.map((marca) => marca._id);
            console.log(idsMarcas);
            const datos = await getData(URLProveedores, opcionesPOST(Authorization, { nombre: descripcionTextfield, idSucursal: usuario.idSucursal, marcas: idsMarcas }));
            handleCloseDialogGuardar();
            console.log(datos);
            setCriterioInicial(descripcionTextfield);
        }
    }
    // ----------------------LAYOUT GUARDAR----------------------
    const crear = (
        <Box>
            <Stack m={2} mt={3}
                spacing={{ xs: 2, sm: 2, md: 4 }}
                justifyContent='space-evenly'
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography>{usuario.sucursal}</Typography>
                </Box>

                <TextField id="nombre" label="Nombre Proveedor" variant="outlined" onChange={handleOnChangeDescripcionTextfield} />

                <AutoCompletar titulo='Marcas' nombre='marca' endpoint={URLMarcas} setValores={setMarcas} />
                <Nuevo titulo='Marcas' nombre='marca' endpoint={URLMarcas} setValor={setMarcas} idSucursal={usuario.idSucursal} />

            </Stack>
            <Notificacion open={openNotificacionGuardar} mensaje='Los campos no pueden estar vacios' tipo='warning' handleClose={handleCloseNotificacionGuardar} />
        </Box>
    );

    return (
        <PageContex.Provider
            value={{
                endpoint: URLProveedores,
                titulo: 'Proveedores',
                nombre: 'proveedor',
                icono: <ProveedorIcon />,
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

export default PageProveedores;