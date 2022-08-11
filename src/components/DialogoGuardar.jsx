import React, { useState, forwardRef } from 'react';

import { Close as CloseIcon, Save as SaveIcon } from '@mui/icons-material';
import { Box, Slide, Button, Dialog, AppBar, Toolbar, IconButton, Typography, Stack } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogoGuardar(props) {
    const { contenido, titulo, handleOnClickGuargar, handleCloseDialog, open } = props;
    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseDialog}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {titulo}
                        </Typography>

                        <Button autoFocus color="inherit" onClick={handleOnClickGuargar}>
                            <Stack direction='row' spacing={2} >
                                <Typography>Guardar</Typography>
                                <SaveIcon />
                            </Stack>
                        </Button>


                    </Toolbar>
                </AppBar>
                <Box m={2}>
                    {contenido}
                </Box>

            </Dialog>
        </div>
    );
}
