import React from 'react';
import { Stack, Typography, Box, Paper, IconButton, Tooltip } from '@mui/material';
import { QrCode as SearchIcon } from '@mui/icons-material';
import usePage from '../../hooks/usePage';
import AutocompleteCreable from './AutocompleteCreable';

const Busqueda = (props) => {
    const { titulo, nombre } = usePage();
    const { handleOnClickBuscarPorCodigo } = props;

    const placeholder = `Buscar ${nombre}`;


    return (
        <>
            <Box mb={2}>
                <Typography variant='h4'>{titulo}</Typography>
            </Box>
            <Stack spacing={2} direction='row' justifyContent='center' alignContent='center'>
                <Paper
                    component="form"
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <Stack spacing={3} direction='row' justifyContent='center' alignContent='center'>
                        <AutocompleteCreable {...props} />

                        <Tooltip title={placeholder}>
                            <IconButton sx={{ p: '10px' }} aria-label="buscar" onClick={handleOnClickBuscarPorCodigo} >
                                <SearchIcon color='primary' />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Paper>
            </Stack>
        </>

    );
}

export default Busqueda;


const topFilms = [
    { nombre: 'The Shawshank Redemption', year: 1994 },
    { nombre: 'The Godfather', year: 1972 },
    { nombre: 'The Godfather: Part II', year: 1974 },
    { nombre: 'The Dark Knight', year: 2008 },
    { nombre: '12 Angry Men', year: 1957 },
    { nombre: "Schindler's List", year: 1993 },
    { nombre: 'Pulp Fiction', year: 1994 },
    {
        nombre: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { nombre: 'The Good, the Bad and the Ugly', year: 1966 },
    { nombre: 'Fight Club', year: 1999 },
    {
        nombre: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        nombre: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { nombre: 'Forrest Gump', year: 1994 },
    { nombre: 'Inception', year: 2010 },
    {
        nombre: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { nombre: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { nombre: 'Goodfellas', year: 1990 },
    { nombre: 'The Matrix', year: 1999 },
    { nombre: 'Seven Samurai', year: 1954 },
    {
        nombre: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { nombre: 'City of God', year: 2002 },
    { nombre: 'Se7en', year: 1995 },
    { nombre: 'The Silence of the Lambs', year: 1991 },
    { nombre: "It's a Wonderful Life", year: 1946 },
    { nombre: 'Life Is Beautiful', year: 1997 },
    { nombre: 'The Usual Suspects', year: 1995 },
    { nombre: 'Léon: The Professional', year: 1994 },
    { nombre: 'Spirited Away', year: 2001 },
    { nombre: 'Saving Private Ryan', year: 1998 },
    { nombre: 'Once Upon a Time in the West', year: 1968 },
    { nombre: 'American History X', year: 1998 },
    { nombre: 'Interstellar', year: 2014 },
];
