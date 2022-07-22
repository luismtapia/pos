import React from 'react';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import LogoIcon from '@mui/icons-material/Diamond';
import { useNavigate } from 'react-router-dom';

import { ValidateSession } from '../auth/ValidarIdentidad';
import { getLocalStorage } from '../auth/LocalStorage';
import { key_permiso } from '../auth/config';

const PagePOS = (props) => {

    const frase_dia = 'Hazlo mejor cada día';
    let navigate = useNavigate();

    const handleComenzar = () => {
        ValidateSession().then((sesion) => {
            if (sesion.token === null) {
                navigate('/login', { replace: true });
            } else {
                navigate('/inicio', { replace: true });
            }
        }).catch((error) => {
            alert('Hubo un error al validar la sesion')
            console.log(error);
        });
    }

    return (
        <>
            <Stack spacing={4} justifyContent='center' alignItems='center' m={2} mt={10}>
                <Typography variant='h2'>Bienvenido</Typography>
                <Avatar sx={{ bgcolor: 'warning.dark' }}>
                    <LogoIcon />
                </Avatar>
                <Button onClick={handleComenzar}>Comenzar</Button>
            </Stack>
            <Stack mr={3} mt={10} direction='row' justifyContent='flex-end'>
                <Typography>"{frase_dia}"</Typography>
            </Stack>
        </>

    );
}

export default PagePOS;
