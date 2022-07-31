import React, { useState, useEffect } from 'react';
import StoreIcon from '@mui/icons-material/Store';

import { TextField, Stack } from '@mui/material';

//
import Busqueda from '../../components/admin/Busqueda';
import Tabla from '../../components/admin/Tabla';
import Cargando from '../../components/Cargando';
import PaperCard from '../../components/PaperCard';
import DialogoGuardar from '../../components/DialogoGuardar';
import DialogoEditar from '../../components/DialogoEditar';
import Notificacion from '../../components/Notificacion';
//utils
import { ValidateSession } from '../../auth/ValidarIdentidad';
import { getLocalStorage } from '../../auth/LocalStorage';
import { key_rol } from '../../utils/configuracion';


const rol = getLocalStorage(key_rol);

const opciones = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' } // auth
}

const columnas = [
    {
        id: 'nombre',
        numeric: false,
        disablePadding: true,
        label: 'Nombre de sucursal',
    },
    {
        id: 'direccion',
        numeric: false,
        disablePadding: true,
        label: 'Dirección',
    }
];

const datosBusqueda = {
    titulo: 'Sucursales',
    nombre: 'sucursal',
    path: 'nueva',
    icono: <StoreIcon />,
}
const PageSucursal = (props) => {
    const { URL } = props;

    // ---------------------NOTIFICACION-----------------------------------------
    const [openNotificacion, setOpenNotificacion] = useState(false);
    const handleCloseNotificacion = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenNotificacion(false);
    };

    // ---------------------API-----------------------------------------
    const [isLoading, setIsLoading] = useState(true);
    const [filas, setFilas] = useState([]);
    const [criterioBusqueda, setCriterioBusqueda] = useState('');
    const [resultado, setResultado] = useState(false);

    useEffect(() => {
        if (criterioBusqueda === '') {
            obtenerDatos();
        } else
            buscarDatos();
    }, [criterioBusqueda]);

    const obtenerDatos = async () => {
        const response = await fetch(URL, opciones);
        const datos = await response.json();
        setFilas(datos);
        setIsLoading(false);
        if (!datos.error)
            setResultado(true);
    };

    const buscarDatos = async () => {
        const response = await fetch(`${URL}/buscar/${criterioBusqueda}`, opciones);
        const datos = await response.json();
        setFilas(datos);
    };

    const handleOnClickBuscar = () => { buscarDatos(); };

    // ----------------------DIALOGO GUARDAR----------------------
    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => { setOpenDialog(false); };
    const handleClickOpenDialog = () => { setOpenDialog(true); };

    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const handleOnChangeNombre = (e) => { setNombre(e.target.value) };
    const handleOnChangeDireccion = (e) => { setDireccion(e.target.value) };

    const handleOnClickGuargar = async () => {
        if (nombre === '' || direccion === '') {
            setOpenNotificacion(true);
        } else {
            const opciones = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: nombre, direccion: direccion })
            }
            const response = await fetch(`${URL}`, opciones);
            const datos = await response.json();
            handleCloseDialog();
            setCriterioBusqueda(nombre);
        }
    }

    const nuevo = (
        <>
            <Stack m={2} mt={3}
                spacing={{ xs: 2, sm: 2, md: 4 }}
                justifyContent='space-evenly'
            >
                <TextField id="outlined-basic" label="Nombre" variant="outlined" onChange={handleOnChangeNombre} />
                <TextField id="outlined-basic" label="Direccion" variant="outlined" onChange={handleOnChangeDireccion} />
            </Stack>
            <Notificacion open={openNotificacion} mensaje='Los campos no pueden estar vacios' tipo='warning' handleClose={handleCloseNotificacion} />
        </>
    );

    // ----------------------DIALOGO EDITAR----------------------
    const [idSeleccionado, setIdSeleccionado] = useState([]);
    const [openDialogoEditar, setOpenDialogoEditar] = useState(false);
    const handleCloseDialogoEditar = () => { setOpenDialogoEditar(false); };
    const handleClickOpenDialogoEditar = async () => {
        setOpenDialogoEditar(true);
        const response = await fetch(`${URL}/${idSeleccionado[0]}`, opciones);
        const datos = await response.json();

        setNombre(datos.nombre);
        setDireccion(datos.direccion);

    };

    const handleOnClickEliminar = () => {
        alert(`Eliminar`);

    }
    const handleOnClickEditar = async () => {
        const opciones = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nombre, direccion: direccion })
        }
        const response = await fetch(`${URL}/${idSeleccionado[0]}`, opciones);
        const datos = await response.json();
        handleCloseDialogoEditar();
        setCriterioBusqueda(nombre);
    }


    const editar = (
        <>
            <Stack m={2} mt={3}
                spacing={{ xs: 2, sm: 2, md: 4 }}
                justifyContent='space-evenly'
            >
                <TextField id="outlined-basic" label="Nombre" value={nombre} variant="outlined" onChange={handleOnChangeNombre} />
                <TextField id="outlined-basic" label="Direccion" value={direccion} variant="outlined" onChange={handleOnChangeDireccion} />
            </Stack>
            <Notificacion open={openNotificacion} mensaje='Los campos no pueden estar vacios' tipo='warning' handleClose={handleCloseNotificacion} />
        </>
    );

    // --------------------------------------------------------------

    const contenido = (resultado ? <Tabla titulo={datosBusqueda.titulo} columnas={columnas} filas={filas} setID={setIdSeleccionado} handleClickOpenDialogoEditar={handleClickOpenDialogoEditar} /> : <>No has agregado ninguna sucursal</>);

    return (
        <div>
            <Busqueda titulo='' nombre={datosBusqueda.nombre} path={datosBusqueda.path} icono={datosBusqueda.icono}
                criterioBusqueda={criterioBusqueda} setCriterioBusqueda={setCriterioBusqueda}
                handleOnClickBuscar={handleOnClickBuscar} handleClickOpenDialog={handleClickOpenDialog}
            />
            {isLoading ? <Cargando open={isLoading} /> : <PaperCard contenido={contenido} />}

            <DialogoGuardar contenido={nuevo} titulo={`Nuevo ${datosBusqueda.nombre}`}
                handleOnClickGuargar={handleOnClickGuargar}
                handleCloseDialog={handleCloseDialog}
                open={openDialog}
            />
            <DialogoEditar contenido={editar} titulo={`Editar ${datosBusqueda.nombre}`}
                handleOnClickEditar={handleOnClickEditar}
                handleCloseDialog={handleCloseDialogoEditar}
                open={openDialogoEditar}
            />
        </div>
    );
}

export default PageSucursal;
