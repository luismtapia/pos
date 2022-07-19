import { TextField, Autocomplete, Stack, Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const options = ['Usuario', 'Administrador'];

const Pagenuevo = (props) => {
    const { URL } = props;

    let navigate = useNavigate();

    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');

    const handleOnClickGuargar = () => {
        alert('guardar en BD y rediccionar a usuarios');
        navigate("/usuarios", { replace: true });
    }
    return (
        <div>
            {URL}
            <Stack m={2}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                justifyContent='space-evenly'
            >
                <TextField id="outlined-basic" label="Nombre" variant="outlined" />
                <TextField id="outlined-basic" label="Telefono" variant="outlined" />
                <TextField id="outlined-basic" label="Direccion" variant="outlined" />
            </Stack>

            <Box m={2}>
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Rol" />}
                />
            </Box>
            usuario estara activo
            <Stack direction='row' justifyContent='flex-end' spacing={2} mr={3} >
                <Button onClick={handleOnClickGuargar}>Guardar</Button>
            </Stack>

        </div>
    );
}

export default Pagenuevo;
