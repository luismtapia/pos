import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Stack } from '@mui/material';

import LayoutNuevo from '../../components/PaperCard';
import Notificacion from '../../components/Notificacion';

const Pageproveedornuevo = () => {
    const { URL } = props;

    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleOnClickGuargar = async () => {
        // if (inputValue !== '') {// hace las cosas
        //     const opciones = {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ descripcion: nombre, usuario: usuario, password: contrasena, rol: inputValue, telefono: telefono, direccion: direccion, estatus: true })
        //     }
        //     const response = await fetch(`${URL}`, opciones);
        //     const datos = await response.json();

        //     if (datos.mensaje) alert(datos.mensaje);
        //     navigate("/usuarios", { replace: true });

        // } else {
        //     alert('no puede estar vacio el rol')
        // }
    }

    const handleAtras = () => {
        navigate(-1);
    }

    const contenido = (
        <Stack>
            <Stack mt={1} direction='row' justifyContent='center'>
                <Typography variant='h4' color="primary">Nuevo usuario</Typography>
            </Stack>
            <Stack m={2} mt={3}
                spacing={{ xs: 2, sm: 2, md: 4 }}
                justifyContent='space-evenly'
            >
                <TextField id="outlined-basic" label="Nombre" variant="outlined" onChange={handleOnChangeNombre} />
                <TextField id="outlined-basic" label="Direccion" variant="outlined" onChange={handleOnChangeDireccion} />
            </Stack>
            <Stack m={2} mt={2}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 2, md: 4 }}
            >
                <TextField id="outlined-basic" label="Usuario" variant="outlined" onChange={handleOnChangeUsuario} />
                <TextField id="outlined-basic" label="Contraseña" variant="outlined" onChange={handleOnChangeContrasena} />
                <TextField id="outlined-basic" label="Telefono" variant="outlined" onChange={handleOnChangeTelefono} />
            </Stack>
            <Stack direction='row' justifyContent='flex-start' >
                <Box m={2} >
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            if (newValue === 'Administrador')
                                setOpen(true);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="rol"
                        options={options}
                        sx={{ minWidth: 245 }}
                        renderInput={(params) => <TextField {...params} label="Rol" />}
                    />
                </Box>
            </Stack>
            <Stack direction='row' justifyContent='flex-start' spacing={2} m={2} >
                <Tooltip title='Usuario estara activo despues de crear'>
                    <Chip color="info" size="small" icon={<DoneIcon />} label='Activo' />
                </Tooltip>
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
            <Notificacion open={open} mensaje='Si añades este usuario como administrador tendra todos los PERMISOS' tipo='warning' handleClose={handleClose} />
        </Box>
    );
}

export default Pageproveedornuevo;
