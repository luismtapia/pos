import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import PaperCard from '../components/PaperCard';
import { ActiveBadge, InactiveBadge } from '../utils/estilos';
import { getData } from '../utils/Librerias';
import { opcionesGET } from '../utils/configuracion';


const PageCuenta = (props) => {
    const { URL } = props;
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        obtenerUsuario();
    }, []);

    const obtenerUsuario = async () => {
        const endpoint = `${URL}/62e1a41343b25903a710a62f`;
        const datos = await getData(endpoint, opcionesGET);
        setUsuario(datos[0]);
    }

    const contenido = (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    m: 1,
                }}
            >

                <Typography>vigencia 20-05-2023</Typography>
                <Typography>quedan 3dias</Typography>
            </Box>
            <Stack justifyContent="flex-start" alignItems="center" spacing={1} mb={8}>
                {
                    usuario.estatus ?
                        <Tooltip title='Usuario activo'>
                            <ActiveBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar src={'https://i.pravatar.cc/300'} sx={{ width: 90, height: 90 }} />
                            </ActiveBadge>

                        </Tooltip>
                        :
                        <Tooltip title='Usuario inactivo'>
                            <InactiveBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar src={'https://i.pravatar.cc/300'} sx={{ width: 90, height: 90 }} />
                            </InactiveBadge>

                        </Tooltip>
                }



                <Stack justifyContent="flex-start" alignItems="center">
                    <Typography variant='h5' >empresa</Typography>
                    <Typography>{usuario.nombre}</Typography>
                </Stack>

            </Stack>

            <Box m={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography>sucripcion: premium</Typography>
            </Box>
            <Divider textAlign="left" >Datos de pago</Divider>
            <Box m={1} >
                <Typography>datos de pago</Typography>
            </Box>
            <Box m={6} >
                <Typography>datos</Typography>
            </Box>
            <Box m={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button color='primary'>renovar</Button>
                <Typography></Typography>
            </Box>
        </div>
    );

    return (
        <div>
            <PaperCard contenido={contenido} />
            icono menu para eliminar cuenta
        </div>
    );
}

export default PageCuenta;
