import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Card } from '@mui/material';

export default function ContainerNuevo(props) {
    const { contenido } = props;
    return (
        <Box m={2} sx={{ minWidth: 275 }}>
            <Paper elevation={6} >
                {contenido}
            </Paper>
        </Box>
    );
}
