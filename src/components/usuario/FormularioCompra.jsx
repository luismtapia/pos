import React from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import { Button, FormControl, IconButton, OutlinedInput, Paper, Stack, TextField, Typography } from '@mui/material';


const FormularioCompra = (props) => {
    const { seleccionado } = props;
    return (
        <div>
            <FormControl>
                <Stack spacing={1}>
                    <TextField id="outlined-basic" label="Nombre" variant="outlined" disabled={seleccionado} />
                    <Stack direction='row'>
                        <TextField id="filled-basic" label="Categoria" variant="filled" disabled={seleccionado} />
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <AddIcon />
                        </IconButton>
                    </Stack>

                    <TextField id="standard-basic" label="Marca" variant="standard" disabled={seleccionado} />
                    <TextField id="filled-basic" label="Codigo" variant="filled" />
                    <TextField id="filled-basic" label="Stock" variant="filled" />
                    <TextField id="filled-basic" label="Precio de Compra" variant="filled" />
                    <TextField id="filled-basic" label="Precio de Venta" variant="filled" />
                </Stack>

            </FormControl>

            <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput placeholder="Please enter text" />
                <TextField id="filled-basic" label="Precio de Venta" variant="filled" />
            </FormControl>
            <Button >Guardar</Button>
        </div>
    );
}

export default FormularioCompra;
