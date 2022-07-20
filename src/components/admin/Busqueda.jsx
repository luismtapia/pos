import React from 'react';
import { Stack, Typography, Box, Paper, Divider, InputBase, IconButton } from '@mui/material';
import { Search as SearchIcon, Save as SaveIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const Busqueda = (props) => {
    const { titulo, icono, busqueda, criterioBusqueda, setCriterioBusqueda, handleOnClickBuscar } = props;
    const placeholder = `Buscar ${busqueda}`;
    let navegar = useNavigate();

    const handleOnChangeCriterioBusqueda = (e) => {
        setCriterioBusqueda(e.target.value);
    };

    const handleOnClickGuardar = () => {
        navegar(`/${busqueda}/nuevo`);
    };


    return (
        <>
            <Box>
                <Typography variant='h4'>{titulo}</Typography>
            </Box>
            <Stack spacing={2} direction='row' justifyContent='space-around' alignContent='center'>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="icono">
                        {icono}
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder={placeholder}
                        value={criterioBusqueda}
                        onChange={handleOnChangeCriterioBusqueda}
                        inputProps={{ 'aria-label': busqueda }}
                    />
                    <IconButton sx={{ p: '10px' }} aria-label="buscar" onClick={handleOnClickBuscar} >
                        <SearchIcon />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="guardar" onClick={handleOnClickGuardar}>
                        <SaveIcon />
                    </IconButton>
                </Paper>
            </Stack>
        </>

    );
}

export default Busqueda;