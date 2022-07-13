import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

export default function Tabla(props) {

    const { columnas, filas } = props;

    const total = (items) => {
        return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
    }

    const handleCobrar = () => {
        alert("alerta")
    }

    return (
        <TableContainer component={Paper} m={2}>
            <Table sx={{ minWidth: 550 }} aria-label="tabla">
                <TableHead>
                    <TableRow>
                        {
                            columnas.map((Encabezado) => (
                                <TableCell>{Encabezado}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filas.map((fila) => (
                        <TableRow
                            key={fila.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{fila.cantidad}</TableCell>
                            <TableCell component="th" scope="row">
                                {fila.producto}
                            </TableCell>

                            <TableCell align="right">{fila.precio}</TableCell>
                            <TableCell align="right">{fila.total}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell />
                        <TableCell ></TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">$ {total(filas)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell />
                        <TableCell colSpan={3} align="right">
                            <FormControl sx={{ m: 1 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">Recibido</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Recibido"
                                    type="number"
                                />
                            </FormControl>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={3} />
                        <TableCell align="right">
                            <Button variant='contained' onClick={handleCobrar}>Cobrar</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
