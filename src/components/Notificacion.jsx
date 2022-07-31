import { Alert, Slide, Snackbar } from '@mui/material';
import React from 'react';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const Notificacion = (props) => {
    const { open, mensaje, tipo, handleClose } = props;

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} TransitionComponent={SlideTransition}>
            <Alert variant="filled" onClose={handleClose} severity={tipo} sx={{ width: '100%' }}>
                {mensaje}
            </Alert>
        </Snackbar>
    );
}

export default Notificacion;
