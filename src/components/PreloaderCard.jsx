import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

const PreloaderCard = () => {
    return (
        <Box m={1}>
            <Stack direction='row' justifyContent='space-between'>
                <Skeleton variant="text" animation="wave" width='10%' height={35} />
                <Skeleton variant="text" animation="wave" width='5%' height={35} />
            </Stack>
            <Skeleton variant="text" animation="wave" height={45} />
            <Skeleton variant="text" animation="wave" height={35} />
            <Skeleton variant="text" animation="wave" height={35} />
            <Skeleton variant="text" animation="wave" height={35} />
            <Skeleton variant="text" animation="wave" height={35} />

            <Stack direction='row' justifyContent='flex-end'>
                <Skeleton variant="text" animation="wave" width='40%' height={35} />
            </Stack>

        </Box>
    );
}

export default PreloaderCard;
