import React from 'react';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import LogoIcon from '@mui/icons-material/Diamond';
import { useNavigate } from 'react-router-dom';

const PagePOS = (props) => {
    const { auth } = props;
    const frase_dia = 'Hazlo mejor cada día';
    let navigate = useNavigate();

    const handleComenzar = () => {
        if (auth.permiso === 'denegado') {
            navigate('/login', { replace: true });
        } else {
            navigate('/inicio', { replace: true });
        }
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
