// Salidas
import React, { useState } from 'react';
import { Container, Button, Stack, TextField, Autocomplete, Divider, Chip } from '@mui/material';

import Tabla from '../../components/usuario/tablaventa';

const Venta = () => {
    // productosBD viene de Base de datos
    const [value, setValue] = useState(productosBD[0]);

    const [lista, setLista] = useState([
        { id: '1', cantidad: 1, producto: 'gansito', precio: 10, total: 0 },
        { id: '2', cantidad: 2, producto: 'frijol', precio: 10, total: 0 },
        { id: '3', cantidad: 3, producto: 'cerveza', precio: 10, total: 0 },
        { id: '4', cantidad: 4, producto: 'knorr suiza', precio: 10, total: 0 },
        { id: '5', cantidad: 5, producto: 'Coca', precio: 10, total: 0 }
    ]);
    const [cantidad, setCantidad] = useState('');
    const [cantidadCorrecta, setCantidadCorrecta] = useState(true);

    const handleCantidad = (e) => {
        if (e.target.value >= 1)
            setCantidadCorrecta(false);
        else
            setCantidadCorrecta(true);
        setCantidad(e.target.value);
    }

    const handleAgregar = () => {
        if (parseInt(cantidad) >= 1)
            setLista([...lista, { id: '6', cantidad: parseInt(cantidad), producto: value.label, precio: value.precio, total: 0 }]);
    }

    const columnas = ['Cantidad', 'Producto', 'Precio', 'Total'];

    (function subtotal() {
        lista.map(fila => {
            fila.total = fila.cantidad * fila.precio
        })
    })();

    return (
        <Container>
            <Stack spacing={2} m={2} direction='row' justifyContent="center" alignItems="center">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    options={productosBD} //lista
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Producto" />}
                />
                {
                    cantidadCorrecta ? <TextField
                        id="outlined-number"
                        label="Cantidad"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleCantidad}
                        error
                    />
                        :
                        <TextField
                            id="outlined-number"
                            label="Cantidad"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleCantidad}
                        />
                }

                <Button variant='contained' onClick={handleAgregar}>Agregar</Button>
            </Stack>
            <Divider>
                <Chip label="TICKET #123" />
            </Divider>
            <Tabla columnas={columnas} filas={lista} />
        </Container>
    );
}

const productosBD = [
    { label: 'Gansito', precio: 10 },
    { label: 'Frijopl', precio: 10 },
    { label: 'cerveza', precio: 10 },
    { label: 'coca', precio: 10 },
    { label: 'pepsi', precio: 10 },
    { label: "sabritas", precio: 10 },
    { label: 'crema', precio: 10 },

];

export default Venta;
