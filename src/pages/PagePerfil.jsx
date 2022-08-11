import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Badge, Box, Button, Divider, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import StoreIcon from '@mui/icons-material/Store';


import PaperCard from '../components/PaperCard';
import BasicTabs from '../components/BasicTabs';

import DialogoEditar from '../components/DialogoEditar';

import Sucursales from './admin/PageSucursales';
import Usuarios from './admin/PageUsuarios';
import { URLSucursales, URLSesiones } from '../utils/configuracion';
import { ActiveBadge, InactiveBadge } from '../utils/estilos';

import { getData } from '../utils/Librerias';
import { opcionesGET, opcionesPUT } from '../utils/configuracion';
import { ValidateSession } from '../auth/ValidarIdentidad';

const PagePerfil = (props) => {
    const { URL } = props;
    let navigate = useNavigate();

    const pestanas = ['Sucursales', 'Usuarios'];
    const componentes = [<Sucursales URL={URLSucursales} />, <Usuarios URL={URL} />];

    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        obtenerUsuario(); // aui se puede pedir pero no se pueden declar constantes
    }, []);

    const obtenerUsuario = async () => {
        const response = await ValidateSession();
        if (!response.idUsuario) navigate('/login', { replace: true });

        console.log(response);
        setUsuario(response);
        // ValidateSession()
        //     .then((response) => {
        //         if (!response.idUsuario) {
        //             navigate('/login', { replace: true });
        //         }

        //         // setUsuario({
        //         //     sucursal: response.sucursal,
        //         //     idSucursal: response.idSucursal
        //         // });
        //     })
        //     .catch((error) => { console.error(error); });

        //const endpoint = `${URL}/${response.idUsuario}`;
        //const datos = await getData(endpoint, opcionesGET);
        //setUsuario(datos[0]);
    }

    // ----------------------DIALOGO EDITAR----------------------

    const [nombreTextfield, setNombreTextfield] = useState('');
    const [usuarioTextfield, setUsuarioTextfield] = useState('');
    const [telefonoTextfield, setTelefonoTextfield] = useState('');
    const [direccionTextfield, setDireccionTextfield] = useState('');
    const handleOnChangeNombreTextfield = (e) => { setNombreTextfield(e.target.value) };
    const handleOnChangeUsuarioTextfield = (e) => { setUsuarioTextfield(e.target.value) };
    const handleOnChangeTelefonoTextfield = (e) => { setTelefonoTextfield(e.target.value) };
    const handleOnChangeDireccionTextfield = (e) => { setDireccionTextfield(e.target.value) };

    const [openDialogoEditar, setOpenDialogoEditar] = useState(false);
    const handleCloseDialogoEditar = () => { setOpenDialogoEditar(false); };
    const handleClickOpenDialogoEditar = async () => {
        // no funciona buscar creo que es porque no ha terminado el evento
        setNombreTextfield(usuario.nombre);
        setUsuarioTextfield(usuario.usuario);
        setTelefonoTextfield(usuario.telefono);
        setDireccionTextfield(usuario.direccion);
        setOpenDialogoEditar(true);
    };

    const handleOnClickEditar = async () => {
        handleCloseDialogoEditar();

        // const endpoint = `${URL}/62e1a41343b25903a710a62f`;
        // const datos = await getData(endpoint, opcionesPUT({
        //     nombre: nombreTextfield,
        //     usuario: usuarioTextfield,
        //     telefono: telefonoTextfield,
        //     direccion: direccionTextfield
        // }));
        // setUsuario(datos[0]);

        alert(nombreTextfield);
        console.log(nombreTextfield);
    }

    // ----------------------DIALOGO CAMBIAR CONTRASEÑA----------------------
    const [viejaPasswordTextfield, setViejaPasswordTextfield] = useState('');
    const [nuevaPasswordTextfield, setNuevaPasswordTextfield] = useState('');
    const [confirmarPasswordTextfield, setConfirmarPasswordTextfield] = useState('');
    const handleOnChangeViejaPasswordTextfield = (e) => { setViejaPasswordTextfield(e.target.value) };
    const handleOnChangeNuevaPasswordTextfield = (e) => { setNuevaPasswordTextfield(e.target.value) };
    const handleOnChangeConfirmarPasswordTextfield = (e) => { setConfirmarPasswordTextfield(e.target.value) };

    const [openDialogoCambiarPassword, setOpenDialogoCambiarPassword] = useState(false);
    const handleCloseDialogoCambiarPassword = () => { setOpenDialogoCambiarPassword(false); };
    const handleClickOpenDialogoCambiarPassword = async () => { setOpenDialogoCambiarPassword(true); };

    const handleOnClickCambiarPassword = async () => {
        handleCloseDialogoCambiarPassword();

        // const endpoint = `${URL}/62e1a41343b25903a710a62f`;
        // const datos = await getData(endpoint, opcionesPUT({
        //     nombre: nombreTextfield,
        //     usuario: usuarioTextfield,
        //     telefono: telefonoTextfield,
        //     direccion: direccionTextfield
        // }));
        // setUsuario(datos[0]);

        alert('cambiar');
    }



    // ----------------------COMPONENTES----------------------
    const contenido = (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    m: 1,
                }}
            >
                <IconButton onClick={handleClickOpenDialogoEditar}>
                    <EditIcon sx={{ color: 'warning.darker' }} />
                </IconButton>

                <Typography>{usuario.nombre}</Typography>
            </Box>

            <Stack justifyContent="flex-start" alignItems="center" spacing={1} mb={8}>
                {
                    usuario.estatus ?
                        <Tooltip title='Usuario activo'>
                            <ActiveBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar src={'https://i.pravatar.cc/300'} sx={{ width: 90, height: 90 }} />
                            </ActiveBadge>

                        </Tooltip>
                        :
                        <Tooltip title='Usuario inactivo'>
                            <InactiveBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar src={'https://i.pravatar.cc/300'} sx={{ width: 90, height: 90 }} />
                            </InactiveBadge>

                        </Tooltip>
                }



                <Stack justifyContent="flex-start" alignItems="center">
                    <Typography variant='h5' >{usuario.empresa}</Typography>
                    <Typography>{usuario.rol}</Typography>
                </Stack>

            </Stack>
            <Box m={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button sx={{ color: 'warning.darker' }} variant="text" onClick={handleClickOpenDialogoCambiarPassword} >Cambiar contraseña</Button>
                <Typography>{usuario.sucursal}</Typography>
            </Box>
            <Divider />

        </div>
    );

    const editar = (
        <>
            <Stack m={2} mt={3}
                spacing={{ xs: 2, sm: 2, md: 4 }}
                justifyContent='space-evenly'
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Stack justifyContent='center' alignItems='flex-end' >
                        <Typography variant='h5'>empresa</Typography>
                        <Typography variant='caption'>sucursal</Typography>
                    </Stack>

                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        usuario.estatus ?
                            <Tooltip title='Usuario activo'>
                                <Badge color="success" variant="dot" >
                                    <Typography>{usuario.rol}</Typography>
                                </Badge>
                            </Tooltip>
                            :
                            <Tooltip title='Usuario inactivo'>
                                <Badge color="error" variant="dot" >
                                    <Typography>{usuario.rol}</Typography>
                                </Badge>
                            </Tooltip>
                    }
                </Box>

                <TextField id="nombre" label="Nombre" onChange={handleOnChangeNombreTextfield} variant="standard" />
                <TextField id="usuario" label="Usuario" onChange={handleOnChangeUsuarioTextfield} variant="outlined" />
                <TextField id="telefono" label="Telefono" onChange={handleOnChangeTelefonoTextfield} variant="outlined" />
                <TextField id="direccion" label="Direccion" onChange={handleOnChangeDireccionTextfield} variant="outlined" />
            </Stack>
            {/* <Notificacion open={openNotificacion} mensaje='Los campos no pueden estar vacios' tipo='warning' handleClose={handleCloseNotificacion} /> */}
        </>
    );
    const cambiar = (
        <>
            <Stack m={2} mt={3}
                spacing={{ xs: 2, sm: 2, md: 4 }}
                justifyContent='space-evenly'
            >

                <TextField id="oldpassword" label="Contraseña anterior" onChange={handleOnChangeViejaPasswordTextfield} variant="standard" />
                <TextField id="nuevapassword" label="Nueva contraseña" onChange={handleOnChangeNuevaPasswordTextfield} variant="outlined" />
                <TextField id="confirmarpassword" label="Confirmar contrseña" onChange={handleOnChangeConfirmarPasswordTextfield} variant="outlined" />

            </Stack>
            {/* <Notificacion open={openNotificacion} mensaje='Los campos no pueden estar vacios' tipo='warning' handleClose={handleCloseNotificacion} /> */}
        </>
    );

    return (
        <div>
            <PaperCard contenido={contenido} />
            {/* {usuario.rol === 'Propietario' ? <BasicTabs pestanas={pestanas} componentes={componentes} /> : <>compañeros?</>}*/}
            {/* <BasicTabs pestanas={pestanas} componentes={componentes} /> */}

            <DialogoEditar contenido={editar} titulo='Editando tus datos'
                handleOnClickEditar={handleOnClickEditar}
                handleCloseDialog={handleCloseDialogoEditar}
                open={openDialogoEditar}
            />
            <DialogoEditar contenido={cambiar} titulo='Cambiar contraseña'
                handleOnClickEditar={handleOnClickCambiarPassword}
                handleCloseDialog={handleCloseDialogoCambiarPassword}
                open={openDialogoCambiarPassword}
            />

        </div>
    );
}

export default PagePerfil;
