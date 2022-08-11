import { Add as AddIcon } from '@mui/icons-material';
import { Button, FormControl, IconButton, OutlinedInput, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BusquedaCompra from '../../components/usuario/BusquedaCompra';
import PaperCard from '../../components/PaperCard';

import PageContex from '../../context/PageContext';
import ProveedorIcon from '@mui/icons-material/PointOfSale';
import { getToken, opcionesGET, URLProductos as endpoint } from '../../utils/configuracion';
import { getData } from '../../utils/Librerias';
import { Formik } from 'formik';
import FormularioCompra from '../../components/usuario/FormularioCompra';

const Pagecompras = () => {

    const [seleccionado, setSeleccionado] = useState(true);
    const [criterioBusqueda, setCriterioBusqueda] = useState(null);
    const [datos, setDatos] = useState([]);

    const [productoEncontrado, setProductoEncontrado] = useState({
        nombre: '',
        categoria: '',
        marca: '',
        codigoBarras: '',
        precioCompra: '',
        precioVenta: '',
        stock: ''
    });


    const contenido = (
        <Stack p={2} spacing={1}>
            <Typography>Producto: nuevo?</Typography>
            <Formik initialValues={{ nombre: '', categoria: '' }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        console.log(values)
                        console.log(actions)
                        actions.setSubmitting(false);
                    }, 2000);
                }}
            >
                {props => <FormularioCompra {...props} seleccionado={seleccionado} />}

                {/* {({ values, handleChange }) => (
                    // <FormControl>
                    //     <TextField id="outlined-basic" name="nombre" label="Nombre" variant="outlined" disabled={seleccionado} onChange={handleChange} value={values.nombre} />
                    // </FormControl>
                    <FormularioCompra {...props} seleccionado={seleccionado} />
                )} */}
            </Formik>

        </Stack>
    );

    // useEffect(() => {
    //     console.log(criterioBusqueda);
    //     setDatos(datos);
    //     console.log('datos: ', datos);

    //     // if (datos === [])
    //     //     reiniciarDatos();

    //     // if (datos.length > 0) {
    //     //     const nuevosDatos = {
    //     //         nombre: datos[0].nombre,
    //     //         categoria: datos[0].idCategoria.nombre,
    //     //         marca: datos[0].idMarca.nombre,
    //     //         codigoBarras: datos[0].codigoBarras,
    //     //         precioCompra: datos[0].precioCompra,
    //     //         precioVenta: datos[0].precioVenta,
    //     //         stock: datos[0].stock
    //     //     }
    //     //     setProductoEncontrado(nuevosDatos);
    //     //     setDatos(datos);
    //     // } else {
    //     //     reiniciarDatos();
    //     //     setSeleccionado(false);
    //     // }
    //     // console.log(datos);
    // }, [criterioBusqueda, datos]);

    useEffect(() => {
        let active = true;
        console.log('entro');
        (async () => {
            const Authorization = getToken();
            const endpointBuscar = `${endpoint}/buscar/${criterioBusqueda}`;
            const datos = await getData(endpointBuscar, opcionesGET(Authorization));

            if (active) {
                setDatos([...datos]);
            }
        })();

        return () => {
            active = false;
        };
    }, [criterioBusqueda]);

    const reiniciarDatos = async () => {
        setProductoEncontrado({
            nombre: criterioBusqueda,
            categoria: '',
            marca: '',
            codigoBarras: '',
            precioCompra: '',
            precioVenta: '',
            stock: ''
        });
    }

    const handleOnClickSeleccionar = () => {
        setSeleccionado(false);
    }

    return (
        <PageContex.Provider
            value={{
                endpoint: endpoint,
                titulo: 'Compras',
                nombre: 'producto',
                icono: <ProveedorIcon />,
            }}>
            <Stack spacing={2}>
                <BusquedaCompra datos={datos} setDatos={setDatos} setCriterioBusqueda={setCriterioBusqueda} handleOnClickSeleccionar={handleOnClickSeleccionar} />
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    justifyContent='space-evenly'
                >
                    <PaperCard contenido={contenido} />
                    <Paper sx={{ minWidth: 275 }}>
                        <Stack p={2} spacing={2}>
                            <Typography>Producto: nuevo?</Typography>
                            <Typography>Nombre: {productoEncontrado.nombre} </Typography>
                            <Typography>Categoria: {productoEncontrado.categoria}</Typography>
                            <Typography>Marca: {productoEncontrado.marca}</Typography>
                            <Typography>Codigo: {productoEncontrado.codigoBarras}</Typography>
                            <Typography>Stock: {productoEncontrado.stock} anterior nuevo</Typography>
                            <Typography>Precio de Compra: {productoEncontrado.precioCompra} %</Typography>
                            <Typography>Precio de Venta: {productoEncontrado.precioVenta} %</Typography>
                        </Stack>
                    </Paper>
                </Stack>
            </Stack>
        </PageContex.Provider>

    );
}

export default Pagecompras;
