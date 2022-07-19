import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, Divider, Stack } from "@mui/material";



export default function Tarjeta(props) {
    const { titulo, contenido, valor, imagen, info } = props;
    return (
        <Card sx={{ minWidth: 275 }}>
            <Stack direction='row' >
                <Stack m={2} alignItems='center' alignContent='center'>
                    <CardMedia
                        component="img"
                        height="194"
                        sx={{ width: 151 }}
                        image={imagen}
                        alt="Paella"
                    />
                    <CardContent>
                        <Typography sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary" gutterBottom>
                            Mas vendido
                        </Typography>
                        <Divider textAlign="left">LEFT</Divider>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                    </CardContent>
                </Stack>


                <Divider orientation="vertical" variant="middle" flexItem />
                <Box m={1}>
                    <Stack direction='row' justifyContent='flex-end' m={1}>
                        <Typography variant="h5" component="div">
                            {titulo}
                        </Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='center' mt={3}>
                        <Stack>
                            <Typography variant="h3" component="div">
                                {contenido}
                            </Typography>
                            <Typography variant="h1" component="div">
                                {valor}
                            </Typography>
                        </Stack>
                    </Stack>
                    <CardActions>
                        <Button size="small">Ver detalles</Button>
                    </CardActions>
                </Box>
            </Stack>

        </Card>
    );
}