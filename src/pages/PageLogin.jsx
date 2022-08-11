import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Avatar, Stack, TextField, Box, Typography } from '@mui/material';

import { Person as LoginIcon, Key as PasswordIcon } from '@mui/icons-material';

import { LogIn } from '../auth/ValidarIdentidad';
import Notificacion from '../components/Notificacion';
import PaperCard from '../components/PaperCard';


export default function Login(props) {
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    let navigate = useNavigate();
    const handleUsuario = (e) => { setUsuario(e.target.value); };
    const handleContraseña = (e) => { setContraseña(e.target.value); };
    const handleRegistrar = () => { navigate('/registro', { replace: true }); };

    const handleLogin = () => {
        LogIn(usuario, contraseña).then((response) => {
            setMensaje(`${response.mensaje} ${response.error}`);
            setOpen(true);
            console.log(response);
            if (response.token !== null) navigate('/inicio', { replace: true });
        }).catch((error) => { alert('_Hay un error al iniciar sesion') })
    };
    const contenido = (
        <>
            <Box sx={{ minWidth: 300 }} >
                <Box pt={1}>
                    <Stack spacing={3} direction='row' m={2} justifyContent='center'>
                        <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.dark' }}>
                            <LoginIcon />
                        </Avatar>
                    </Stack>
                </Box>

                <Box mt={4}>
                    <Stack spacing={3} direction='column' mr={2} ml={2} justifyContent='center'>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LoginIcon sx={{ color: 'primary.dark', mr: 1, my: 0.5 }} />
                            <TextField label="Usuario" variant="standard" onChange={handleUsuario}>Usuario</TextField>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PasswordIcon sx={{ color: 'primary.dark', mr: 1, my: 0.5 }} />
                            <TextField label="Contraseña" variant="outlined" onChange={handleContraseña}> Contraseña</TextField>
                        </Box>
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} p={2}>
                        <Typography>Olvide mi contraseña</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <Button onClick={handleLogin}>Iniciar sesión</Button>
                </Box>
                <Stack direction='row' m={1} justifyContent='flex-end' alignItems='center' >
                    <Typography>¿Aún no tienes cuenta? </Typography>
                    <Button onClick={handleRegistrar}>Crear cuenta</Button>
                </Stack>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} p={1}>
                <Typography>PoS</Typography>
            </Box>
        </>
    );

    return (
        <Stack alignItems='center' mt={4}>
            <PaperCard contenido={contenido} />
            <Notificacion mensaje={mensaje} tipo='error' open={open} handleClose={handleClose} />
        </Stack >

    );
}
