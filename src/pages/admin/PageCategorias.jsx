//----------------------------------IMPORTA---------------------------------------
//--------------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, TextField, Typography } from '@mui/material';
import CategoriaIcon from '@mui/icons-material/Class';

import PageCRUD from './PageCRUD';
import Notificacion from '../../components/Notificacion';
import PageContex from '../../context/PageContext';

import { getToken, opcionesPOST, URLCategorias } from '../../utils/configuracion';
import { getData } from '../../utils/Librerias';
import { ValidateSession } from '../../auth/ValidarIdentidad';

const PageCategorias = () => {
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
            const datos = await getData(URLCategorias, opcionesPOST(Authorization, { nombre: descripcionTextfield, idSucursal: usuario.idSucursal }));
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
                endpoint: URLCategorias,
                titulo: 'Categorias',
                nombre: 'categoria',
                icono: <CategoriaIcon />,
                columnas: [{
                    id: 'nombre',
                    numeric: false,
                    disablePadding: true,
                    label: 'Categoria',
                }]
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

export default PageCategorias;