import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function NotFound() {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="info">
                <AlertTitle>Sin resultados</AlertTitle>
                Lo que estas buscando no existe o no se a creado — <strong>ES TU OPORTUNIDAD DE BRILLAR</strong> — crea ese recurso
            </Alert>
        </Stack>
    );
}
