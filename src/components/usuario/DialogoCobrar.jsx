import React, { useState } from 'react';
import { Button, Dialog, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Close as CloseIcon } from '@mui/icons-material';

import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    const { open, handleClose, setOpen, total } = props;
    const [recibido, setRecibido] = useState(0.0);
    const [cambio, setCambio] = useState(0);

    const handleOnChangeRecibido = (e) => {
        setCambio(e.target.value - total);
    }


    const handleGuardar = () => {
        setOpen(false);
        alert('alert')
    }
    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Ticket
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleGuardar}>
                            Guardar
                        </Button>
                    </Toolbar>
                </AppBar>
                <Stack direction="row" spacing={2} justifyContent="space-evenly" alignItems="center">
                    <Typography variant="h3">Total: </Typography>
                    <Typography variant="h6">$ {total} </Typography>
                </Stack>

                <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Recibido</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Recibido"
                        type="number"
                        onChange={handleOnChangeRecibido}
                    />
                </FormControl>
                <Typography>Su cambio es: {cambio} </Typography>

                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <Button variant='contained'>Cancelar</Button>
                    <Button variant='contained'>Cobrar</Button>
                </Stack>
            </Dialog>
        </div>
    );
}
