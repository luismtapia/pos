import * as React from 'react';
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

export default function BasicCard() {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRegistrar = () => {
        alert("Lo siento aun no sirvo :( .... Pero mi jefa ya se encuentra trabajando el ello :) .... Solo tenganle paciencia y confianza .... Saludos Cordiales!")

    };

    return (
        <Stack mt={10} direction='row' justifyContent='center' >
            <Card sx={{ minWidth: 275 }} >
                <Stack m={4}>
                    <Box>
                        <Stack direction='row' justifyContent='center'>
                            <Typography variant='h5'>Registrarse</Typography>
                        </Stack>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-with-icon-adornment">Nombre</InputLabel>
                            <Input
                                id="input-with-icon-adornment"
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
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
            </Card>
        </Stack >
    );
}
