import React, { Fragment, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { getToken, opcionesGET, opcionesPOST } from '../utils/configuracion';
import { getData } from '../utils/Librerias';

const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog(props) {
    const { titulo, nombre, endpoint, idSucursal, setValor } = props;

    const [value, setValue] = useState(null);
    const [open, toggleOpen] = useState(false);
    const [options, setOptions] = useState([]);

    const handleClose = () => {
        setDialogValue({
            nombre: '',
        });

        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = useState({
        nombre: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        // return a autocomplete
        const Authorization = getToken();
        const datos = await getData(endpoint, opcionesPOST(Authorization, { nombre: dialogValue.nombre, idSucursal: idSucursal }));
        console.log('datoscrea: ', datos);
        setValor(datos.marcaGuardada)
        handleClose();
    };

    useEffect(() => {
        let active = true;

        (async () => {
            const Authorization = getToken();
            const datos = await getData(endpoint, opcionesGET(Authorization));

            if (active) setOptions([...datos]);

        })();

        return () => {
            active = false;
        };
    }, [value]);

    return (
        <Fragment>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({ nombre: newValue });
                        });
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue({
                            nombre: newValue.inputValue,
                        });
                    } else {
                        setValue(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            nombre: `Añadir "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                id="nuevo"
                options={options}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.nombre;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.nombre}</li>}
                freeSolo
                renderInput={(params) => <TextField {...params} label="¿No encuentras el recurso? Crealo aqui" />}
            />
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Agrega {nombre}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Una vez guardado podras agregarlo a las marcas
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="nombre"
                            value={dialogValue.nombre}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    nombre: event.target.value,
                                })
                            }
                            label="Nombre"
                            type="text"
                            variant="standard"
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit">Añadir</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
}