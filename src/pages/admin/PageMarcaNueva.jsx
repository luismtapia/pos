import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Done as DoneIcon, ArrowBack as AtrasIcon } from '@mui/icons-material';
import { TextField, Autocomplete, Stack, Box, Button, Typography, Chip, Tooltip, IconButton } from '@mui/material';

import LayoutNuevo from '../../components/PaperCard';
import Notificacion from '../../components/Notificacion';

const options = ['Usuario', 'Administrador'];

const Pagemarcanueva = (props) => {
    const { URL } = props;

    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const [descripcion, setDescripcion] = useState('');
    const handleOnChangeDescripcion = (e) => { setDescripcion(e.target.value) };

    let navigate = useNavigate();

    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');

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
                <Typography variant='h4' color="primary">Nueva Marca</Typography>
            </Stack>
            <Stack m={2} mt={3}
                spacing={{ xs: 2, sm: 2, md: 4 }}
                justifyContent='space-evenly'
            >
                <TextField id="outlined-basic" label="Descripcion" variant="outlined" onChange={handleOnChangeDescripcion} />
            </Stack>
            <Stack direction='row' justifyContent='flex-start' >
                <Box m={2} >
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="rol"
                        options={options}
                        sx={{ minWidth: 245 }}
                        renderInput={(params) => <TextField {...params} label="Proveedor" />}
                    />
                </Box>
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

export default Pagemarcanueva;
