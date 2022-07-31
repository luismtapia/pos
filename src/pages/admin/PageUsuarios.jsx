import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Done as DoneIcon, ArrowBack as AtrasIcon } from '@mui/icons-material';
import { TextField, Autocomplete, Stack, Box, Button, Typography, Chip, Tooltip, IconButton } from '@mui/material';


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

const roles = ['Usuario', 'Administrador'];

const opciones = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
}


const columnas = [
    {
        id: 'nombre',
        numeric: false,
        disablePadding: true,
        label: 'Nombre',
    },
    {
        id: 'usuario',
        numeric: false,
        disablePadding: true,
        label: 'Usuario',
    },
    {
        id: 'rol',
        numeric: false,
        disablePadding: false,
        label: 'Permiso',
    },
    {
        id: 'estatus',
        numeric: false,
        disablePadding: false,
        label: 'Estatus',
    }
];

const datosBusqueda = {
    titulo: 'Usuarios',
    nombre: 'usuario',
    path: 'nuevo',
    icono: <PersonIcon />,
}
const PageUsuario = (props) => {
    const { URL } = props;


    // ---------------------NOTIFICACION-----------------------------------------
    const [openNotificacion, setOpenNotificacion] = useState(false);
    const handleCloseNotificacion = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenNotificacion(false);
        setOpenAdmin(false);
    };

    // ---------------------API-----------------------------------------
    const [isLoading, setIsLoading] = useState(true);
    const [filas, setFilas] = useState([]);
    const [criterioBusqueda, setCriterioBusqueda] = useState('');
    const [resultado, setResultado] = useState(false);

    useEffect(() => {
        if (criterioBusqueda === '')
            obtenerDatos();
        else
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
    const [openDialogoGuardar, setOpenDialogoGuardar] = useState(false);
    const handleCloseDialogoGuardar = () => { setOpenDialogoGuardar(false); };
    const handleClickOpenDialogoGuardar = () => { setOpenDialogoGuardar(true); };
    const [openAdmin, setOpenAdmin] = useState(false);

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleOnChangeNombre = (e) => { setNombre(e.target.value) };
    const handleOnChangeTelefono = (e) => { setTelefono(e.target.value) };
    const handleOnChangeDireccion = (e) => { setDireccion(e.target.value) };
    const handleOnChangeUsuario = (e) => { setUsuario(e.target.value) };
    const handleOnChangeContrasena = (e) => { setContrasena(e.target.value) };

    const [value, setValue] = useState(roles[0]);
    const [inputValue, setInputValue] = useState('');

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
            handleCloseDialogoGuardar();
            setCriterioBusqueda(nombre);
        }
    }

    // ----------------------DIALOGO EDITAR----------------------
    const [idSeleccionado, setIdSeleccionado] = useState([]);
    const [openDialogoEditar, setOpenDialogoEditar] = useState(false);
    const handleCloseDialogoEditar = () => { setOpenDialogoEditar(false); };
    const handleClickOpenDialogoEditar = () => { setOpenDialogoEditar(true); };

    const handleOnClickEliminar = () => {
        alert(`Eliminar`);

    }
    const handleOnClickEditar = async () => {
        // const opciones = {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify({ nombre: nombre, direccion: direccion })
        //         }
        //         const response = await fetch(`${URL}`, opciones);
        //         const datos = await response.json();
        //         handleCloseDialog();
        //         setCriterioBusqueda(nombre);
        alert(`editar ${idSeleccionado[0]}`);

        console.log(idSeleccionado);
    }

    const nuevo = (
        <Stack>
            <Stack m={2} mt={3}
                spacing={{ xs: 2, sm: 2, md: 4 }}
                justifyContent='space-evenly'
            >
                <TextField id="outlined-basic" label="Nombre" variant="outlined" onChange={handleOnChangeNombre} />
                <TextField id="outlined-basic" label="Direccion" variant="outlined" onChange={handleOnChangeDireccion} />
            </Stack>
            <Stack m={2} mt={2}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 2, md: 4 }}
            >
                <TextField id="outlined-basic" label="Usuario" variant="outlined" onChange={handleOnChangeUsuario} />
                <TextField id="outlined-basic" label="Contraseña" variant="outlined" onChange={handleOnChangeContrasena} />
                <TextField id="outlined-basic" label="Telefono" variant="outlined" onChange={handleOnChangeTelefono} />
            </Stack>
            <Stack direction='row' justifyContent='flex-start' >
                <Box m={2} >
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            if (newValue === 'Administrador')
                                setOpenAdmin(true);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="rol"
                        options={roles}
                        sx={{ minWidth: 245 }}
                        renderInput={(params) => <TextField {...params} label="Rol" />}
                    />
                </Box>
            </Stack>
            <Stack direction='row' justifyContent='flex-start' spacing={2} m={2} >
                <Tooltip title='Usuario estara activo despues de crear'>
                    <Chip color="info" size="small" icon={<DoneIcon />} label='Activo' />
                </Tooltip>
            </Stack>

            <Notificacion open={openNotificacion} mensaje='Los campos no pueden estar vacios' tipo='warning' handleClose={handleCloseNotificacion} />
            <Notificacion open={openAdmin} mensaje='Si añades este usuario como administrador tendra todos los PERMISOS' tipo='warning' handleClose={handleCloseNotificacion} />
        </Stack>
    );

    const editar = (
        <Stack>
            <Stack m={2} mt={3}
                spacing={{ xs: 2, sm: 2, md: 4 }}
                justifyContent='space-evenly'
            >
                <TextField id="outlined-basic" label="Nombre" variant="outlined" onChange={handleOnChangeNombre} />
                <TextField id="outlined-basic" label="Direccion" variant="outlined" onChange={handleOnChangeDireccion} />
            </Stack>
            <Stack m={2} mt={2}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 2, md: 4 }}
            >
                <TextField id="outlined-basic" label="Usuario" variant="outlined" onChange={handleOnChangeUsuario} />
                <TextField id="outlined-basic" label="Contraseña" variant="outlined" onChange={handleOnChangeContrasena} />
                <TextField id="outlined-basic" label="Telefono" variant="outlined" onChange={handleOnChangeTelefono} />
            </Stack>
            <Stack direction='row' justifyContent='flex-start' >
                <Box m={2} >
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            if (newValue === 'Administrador')
                                setOpenAdmin(true);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="rol"
                        options={roles}
                        sx={{ minWidth: 245 }}
                        renderInput={(params) => <TextField {...params} label="Rol" />}
                    />
                </Box>
            </Stack>
            <Stack direction='row' justifyContent='flex-start' spacing={2} m={2} >
                <Tooltip title='Usuario estara activo despues de crear'>
                    <Chip color="info" size="small" icon={<DoneIcon />} label='Activo' />
                </Tooltip>
            </Stack>

            <Notificacion open={openNotificacion} mensaje='Los campos no pueden estar vacios' tipo='warning' handleClose={handleCloseNotificacion} />
            <Notificacion open={openAdmin} mensaje='Si añades este usuario como administrador tendra todos los PERMISOS' tipo='warning' handleClose={handleCloseNotificacion} />
        </Stack>
    );

    // --------------------------------------------------------------

    const contenido = (resultado ? <Tabla titulo={datosBusqueda.titulo} columnas={columnas} filas={filas} setID={setIdSeleccionado} URL={URL} handleClickOpenDialogoEditar={handleClickOpenDialogoEditar} /> : <>No has agregado ningun Usuario</>);


    return (
        <div>
            <Busqueda titulo={datosBusqueda.titulo} nombre={datosBusqueda.nombre} path={datosBusqueda.path} icono={datosBusqueda.icono}
                criterioBusqueda={criterioBusqueda} setCriterioBusqueda={setCriterioBusqueda}
                handleOnClickBuscar={handleOnClickBuscar} handleClickOpenDialog={handleClickOpenDialogoGuardar}
            />
            {isLoading ? <Cargando open={isLoading} /> : <PaperCard contenido={contenido} />}

            <DialogoGuardar contenido={nuevo} titulo={`Nuevo ${datosBusqueda.nombre}`}
                handleOnClickGuargar={handleOnClickGuargar}
                handleCloseDialog={handleCloseDialogoGuardar}
                open={openDialogoGuardar}
            />
            <DialogoEditar contenido={nuevo} titulo={`Editar ${datosBusqueda.nombre}`}
                handleOnClickEditar={handleOnClickEditar}
                handleCloseDialog={handleCloseDialogoEditar}
                open={openDialogoEditar}
            />
        </div>
    );
}

export default PageUsuario;
