import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, Icon, IconButton, Input, InputAdornment, InputLabel, Stack, TextField } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AccountCircle, Visibility, VisibilityOff, PermContactCalendar, Person, Call, Home } from '@mui/icons-material';
import { minHeight } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import PaperCard from '../components/PaperCard'
import { key_token } from '../auth/config';
import { getLocalStorage } from '../auth/LocalStorage';

export default function PageSignUp(props) {
    const { URL } = props;

    let navigate = useNavigate();

    const [verContrasena, setVerContrasena] = useState(false);

    const [verConfirmar_Contrasena, setVerConfirmar_Contrasena] = useState(false);

    const handleClickVerContrasena = () => {
        setVerContrasena(!verContrasena);
    };

    const handleClickVerConfirmar_Contrasena = () => {
        setVerConfirmar_Contrasena(!verConfirmar_Contrasena);
    };

    const handleRegistrar = () => {
        if (nombre === "" || usuario === "" || contrasena === "" || confirmar_contrasena === "" || telefono === "" || direccion === "")
            alert("No se puede dejar ningun campo vacío");
        if (contrasena !== confirmar_contrasena)
            alert("Tu contraseña no esta correcta");
        obtenerDatos();
    };


    const obtenerDatos = async () => {
        const opciones = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: nombre, usuario: usuario, password: contrasena, confirmar_contrasena, telefono, direccion, descripcion: 'gd'
            })
        }
        const response = await fetch(`${URL}/signup`, opciones);
        const datos = await response.json();

        console.log(datos);
    }

    const handleLogin = () => {
        navigate('/login', { replace: true });
    };

    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmar_contrasena, setConfirmar_contrasena] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    const handleChangeNombre = (event) => { setNombre(event.target.value); };

    const handleChangeUsuario = (event) => {
        setUsuario(event.target.value);
    }

    const handleChangeContrasena = (event) => {
        setContrasena(event.target.value);
    }

    const handleChangeConfirmarContrasena = (event) => {
        setConfirmar_contrasena(event.target.value)

    }

    const handleChangeTelefono = (event) => {
        setTelefono(event.target.value)

    }

    const handleChangeDireccion = (event) => {
        setDireccion(event.target.value)
    }

    const contenido = (
        <Box pt={3} >
            <Stack m={2} >
                <Box>
                    <Stack direction='row' justifyContent='center'>
                        <Typography variant='h5'>Registrar</Typography>
                    </Stack>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">Nombre</InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            onChange={handleChangeNombre}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton>
                                        <PermContactCalendar />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">Usuario</InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            onChange={handleChangeUsuario}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton>
                                        <Person />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={verContrasena ? 'text' : 'password'}
                            onChange={handleChangeContrasena}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickVerContrasena}
                                    >
                                        {verContrasena ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Confirmar Contraseña</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={verConfirmar_Contrasena ? 'text' : 'password'}
                            onChange={handleChangeConfirmarContrasena}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickVerConfirmar_Contrasena}
                                    >
                                        {verConfirmar_Contrasena ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">Teléfono</InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            onChange={handleChangeTelefono}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton>
                                        <Call />
                                    </IconButton>

                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">Dirección</InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            onChange={handleChangeDireccion}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton>
                                        <Home />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
            </Stack>
            <Stack m={3} direction='row' justifyContent='center'>
                <Button onClick={handleRegistrar}>REGISTRAR</Button>
            </Stack>
            <Stack m={3} direction='row' justifyContent='center'>
                <Typography>Ya tienes una cuenta?<Button onClick={handleLogin}>Inicia Sesión</Button></Typography>
            </Stack>
        </Box >
    );

    return (
        <Stack alignItems='center' mt={2}>
            <PaperCard contenido={contenido} />
        </Stack >
    );
}
