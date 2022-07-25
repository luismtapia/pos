import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as AtrasIcon } from '@mui/icons-material';
import { TextField, Stack, Box, Button, Typography, IconButton } from '@mui/material';

import LayoutNuevo from '../../components/PaperCard';
import Notificacion from '../../components/Notificacion';

import { getLocalStorage } from '../../auth/LocalStorage';
import { key_token } from '../../auth/config';

const Pagemarcanueva = (props) => {
    const { URL } = props;

    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');
    const handleOnChangeNombre = (e) => { setNombre(e.target.value) };

    let navigate = useNavigate();

    const handleOnClickGuargar = async () => {
        if (nombre !== '') {// hace las cosas
            const tokenLocal = getLocalStorage(key_token);
            const opciones = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenLocal}`
                },
                body: JSON.stringify({ nombre: nombre })
            }
            const response = await fetch(`${URL}`, opciones);
            const datos = await response.json();


            if (datos.mensaje) {
                setMensaje(`${datos.mensaje} ${datos.error}`);
                setOpen(true);
            } else {
                navigate("/categorias", { replace: true });
            }
        } else {
            setMensaje('La nombre no puede estar vacia');
            setOpen(true);
        }
    }

    const handleAtras = () => {
        navigate(-1);
    }

    const contenido = (
        <Stack>
            <Stack mt={1} direction='row' justifyContent='center'>
                <Typography variant='h4' color="primary">Nueva Categoria</Typography>
            </Stack>
            <Stack m={2} mt={3}
                spacing={{ xs: 2, sm: 2, md: 4 }}
                justifyContent='space-evenly'
            >
                <TextField id="outlined-basic" label="Descripcion" variant="outlined" onChange={handleOnChangeNombre} />
            </Stack>

            <Stack direction='row' justifyContent='flex-end' spacing={2} m={3} >
                <Button onClick={handleOnClickGuargar}>Guardar</Button>
            </Stack>
        </Stack>
    );
    return (
        <Box mt={2}>
            <Box ml={2}>
                <IconButton onClick={handleAtras} color='secondary'>
                    <AtrasIcon />
                </IconButton>
            </Box>

            <LayoutNuevo contenido={contenido} />
            <Notificacion open={open} mensaje={mensaje} tipo='error' handleClose={handleClose} />

        </Box>
    );
}

export default Pagemarcanueva;
