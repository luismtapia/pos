import React from 'react';
import { Card, CardActions, CardContent, Button, Avatar, Stack, TextField, InputAdornment, Box, Typography } from '@mui/material';

import { Person as LoginIcon, Key as PasswordIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const { auth, usuario, contraseña, setUsuario, setContraseña } = props;

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
        //if (auth.permiso === 'permitido')
        navigate('/inicio', { replace: true });
    }

    return (
        <Stack alignItems='center' >
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
        </Stack >

    );
}
