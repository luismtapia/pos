import React, { useState } from 'react';
import { Card, CardContent, Button, Avatar, Stack, TextField, InputAdornment, Box, Typography, Snackbar, Alert, Slide } from '@mui/material';

import { Person as LoginIcon, Key as PasswordIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { LogIn } from '../auth/ValidarIdentidad';
import Notificacion from '../components/Notificacion';



export default function Login(props) {
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    let navigate = useNavigate();
    const handleUsuario = (e) => {
        setUsuario(e.target.value);
    };
    const handleContraseña = (e) => {
        setContraseña(e.target.value);
    };

    const handleRegistrar = () => {
        navigate('/registro', { replace: true });
    }

    const handleLogin = () => {
        LogIn(usuario, contraseña)
            .then((response) => {
                setMensaje(`${response.mensaje} ${response.error}`);
                setOpen(true);

                if (response.token !== null)
                    navigate('/inicio', { replace: true });
            })
            .catch((error) => { alert('_Hay un error al iniciar sesion') })

    }

    return (
        <Stack alignItems='center' mt={4}>
            <Card sx={{ minWidth: 300 }}>
                <Stack spacing={3} direction='row' m={2} justifyContent='center'>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: 'warning.ligth' }}>
                        <LoginIcon color='secondary' />
                    </Avatar>
                </Stack>
                <CardContent>
                    <Stack spacing={3} direction='column' m={2} justifyContent='center'>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LoginIcon sx={{ color: 'primary.dark', mr: 1, my: 0.5 }} />
                            <TextField label="Usuario" variant="outlined" onChange={handleUsuario}>Usuario</TextField>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PasswordIcon sx={{ color: 'primary.dark', mr: 1, my: 0.5 }} />
                            <TextField label="Contraseña" variant="outlined" onChange={handleContraseña}> Contraseña</TextField>
                        </Box>
                    </Stack>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleLogin}>Iniciar sesion</Button>
                </Box>
                <Stack direction='row' m={2} justifyContent='flex-end' >
                    <Button onClick={handleRegistrar}>Registrar</Button>
                </Stack>
            </Card>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography>Olvide mi contraseña</Typography>
            </Box>

            <Notificacion mensaje={mensaje} tipo='error' open={open} handleClose={handleClose} />
        </Stack >

    );
}
