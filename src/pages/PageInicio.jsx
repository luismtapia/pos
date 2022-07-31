import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// componentes
import Tarjeta from '../components/Card';

// utils
import { ValidateSession } from '../auth/ValidarIdentidad';

const Inicio = (props) => {

    let navigate = useNavigate();
    // total vendido
    // mas vendido
    useEffect(() => {
        ValidateSession()
            .then((response) => {
                if (response.token === null) {
                    navigate('/login', { replace: true });
                }
            })
            .catch((error) => { });


    }, []);

    return (
        <div>
            <Stack m={2} spacing={{ xs: 1, sm: 2, md: 4 }}
                direction={{ xs: 'column', sm: 'row' }} justifyContent='space-around' >
                <Tarjeta imagen='https://www.alexmedina.net/wp-content/uploads/2019/12/javascript.png' titulo='Producto' contenido='Limones' valor='500' info='mas vendido' />
                <Tarjeta imagen='https://images.pexels.com/photos/7606231/pexels-photo-7606231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' titulo='Hoy' contenido='Vendido' valor='500' info='mas vendido' />
            </Stack>
        </div>
    );
}

export default Inicio;
