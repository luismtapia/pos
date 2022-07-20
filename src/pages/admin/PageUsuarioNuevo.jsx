import { TextField, Autocomplete, Stack, Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const options = ['Usuario', 'Administrador'];

const Pagenuevo = (props) => {
    const { URL } = props;

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');

    const handleOnChangeNombre = (e) => { setNombre(e.target.value) };
    const handleOnChangeTelefono = (e) => { setTelefono(e.target.value) };
    const handleOnChangeDireccion = (e) => { setDireccion(e.target.value) };

    let navigate = useNavigate();

    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');

    const handleOnClickGuargar = async () => {


        if (inputValue !== '') {// hace las cosas
            const opciones = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ descripcion: nombre, rol: inputValue, telefono: telefono, direccion: direccion, estatus: true })
            }
            const response = await fetch(`${URL}`, opciones);
            const datos = await response.json();

            if (datos.mensaje) alert(datos.mensaje);
            navigate("/usuarios", { replace: true });

        } else {
            alert('no puede estar vacio el rol')
        }
    }

    return (
        <div>
            {URL}
            <Stack m={2}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                justifyContent='space-evenly'
            >
                <TextField id="outlined-basic" label="Nombre" variant="outlined" onChange={handleOnChangeNombre} />
                <TextField id="outlined-basic" label="Telefono" variant="outlined" onChange={handleOnChangeTelefono} />
                <TextField id="outlined-basic" label="Direccion" variant="outlined" onChange={handleOnChangeDireccion} />
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
