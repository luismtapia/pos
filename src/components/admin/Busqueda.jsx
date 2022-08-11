import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Box, Paper, Divider, InputBase, IconButton, Tooltip } from '@mui/material';
import { QrCode as SearchIcon, Save as SaveIcon } from '@mui/icons-material';
import usePage from '../../hooks/usePage';

const Busqueda = (props) => {
    const { titulo, nombre, icono } = usePage();
    // const { titulo, icono, nombre, path, criterioBusqueda, setCriterioBusqueda, handleOnClickBuscar, handleClickOpenDialog } = props;
    const { criterioBusqueda, setCriterioBusqueda, handleOnClickBuscar, handleClickOpenDialog } = props;

    const placeholder = `Buscar ${nombre}`;
    // let navegar = useNavigate();

    const handleOnChangeCriterioBusqueda = (e) => {
        setCriterioBusqueda(e.target.value);
    };

    //const handleOnClickGuardar = () => { navegar(`/${nombre}/${path}`); };


    return (
        <>
            <Box mb={2}>
                <Typography variant='h4'>{titulo}</Typography>
            </Box>
            <Stack spacing={2} direction='row' justifyContent='space-around' alignContent='center'>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <Tooltip title={nombre}>
                        <IconButton sx={{ p: '10px' }} aria-label="icono">
                            {icono}
                        </IconButton>
                    </Tooltip>

                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder={placeholder}
                        value={criterioBusqueda}
                        onChange={handleOnChangeCriterioBusqueda}
                        inputProps={{ 'aria-label': nombre }}
                    />
                    <Tooltip title={placeholder}>
                        <IconButton sx={{ p: '10px' }} aria-label="buscar" onClick={handleOnClickBuscar} >
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>

                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <Tooltip title="Crear">
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="Crear" onClick={handleClickOpenDialog}>
                            <SaveIcon />
                        </IconButton>
                    </Tooltip>

                </Paper>
            </Stack>
        </>

    );
}

export default Busqueda;