import React, { useState, forwardRef } from 'react';

import { Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, Slide, Button, Dialog, AppBar, Toolbar, IconButton, Typography, Stack } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogoEditar(props) {
    const { contenido, titulo, handleOnClickEditar, handleCloseDialog, open } = props;

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
                        <Button autoFocus color="inherit" onClick={handleOnClickEditar}>
                            <Stack direction='row' spacing={2} >
                                <Typography>Editar</Typography>
                                <EditIcon />
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
