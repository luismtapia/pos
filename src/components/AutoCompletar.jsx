import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, CircularProgress } from '@mui/material';
import { getToken, opcionesGET } from '../utils/configuracion';
import { getData } from '../utils/Librerias';


export default function Asynchronous(props) {
    const { titulo, nombre, endpoint, setValores } = props;

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;



    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const Authorization = getToken();
            const datos = await getData(endpoint, opcionesGET(Authorization));

            if (active) setOptions([...datos]);

        })();

        return () => {
            active = false;
        };
    }, [loading]);

    // ----------------------LIMPIAR DATOS DEL AUTOCOMPLETE----------------------
    useEffect(() => {
        if (!open) setOptions([]);
    }, [open]);




    return (
        <>
            <Autocomplete
                id="autocompletar"
                multiple
                limitTags={2}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                onChange={(event, newValue) => { setValores(newValue) }}
                isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
                getOptionLabel={(option) => option.nombre}
                options={options}
                loading={loading}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={titulo}
                        placeholder={`Añadir ${nombre}`}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />

        </>
    );
}