import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { Badge, Menu, MenuItem, Button, Typography, ListItem, ListItemButton, ListItemText, Toolbar, ListItemIcon, Tooltip, Fade, ListItemAvatar, Avatar, Stack } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Person from '@mui/icons-material/Person';

import { LogOut } from '../auth/ValidarIdentidad';
import { eliminaAcentos } from '../utils/Librerias';


const drawerWidth = 240;
const navItems = ['Inicio', 'Categorías', 'Marcas', 'Proveedores', 'Productos', 'Ventas', 'Compras'];
const navItemsUser = ['Inicio', 'Ventas', 'Compras'];

function DrawerAppBar(props) {
    const { window } = props;

    //
    let navigate = useNavigate();

    const handleClickRoute = (item) => (event) => {
        const minusculas = item.toLowerCase();
        const ruta = eliminaAcentos(minusculas);
        navigate(`/${ruta}`, { replace: true });
    }

    // Menu hamburguesa mobile
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                PoS sucursal
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding >
                        <ListItemButton sx={{ textAlign: 'left' }} onClick={handleClickRoute(item)}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,

                                    justifyContent: 'center',
                                }}
                            >
                                <MenuIcon />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    // ------------------------------------------------------------------------------
    // ----------------------------MENUS DESPEGABLES---------------------------------
    // ------------------------------------------------------------------------------
    // ----------------------------MENU PERFIL---------------------------------------
    const [anchorElPerfil, setAnchorElPerfil] = useState(null);
    const menuOpenPerfil = Boolean(anchorElPerfil);
    const handleMenuPerfilOpen = (event) => {
        setAnchorElPerfil(event.currentTarget);
    };
    const handleMenuPerfilClose = () => {
        setAnchorElPerfil(null);
    };

    const handleMenuPerfilLogOut = () => {
        LogOut();
        handleMenuPerfilClose();
        navigate(`/login`, { replace: true });

    };
    const handleMenuPerfil = () => {
        handleMenuPerfilClose();
        navigate(`/perfil`, { replace: true });
    };
    const handleMenuCuenta = () => {
        handleMenuPerfilClose();
        navigate(`/cuenta`, { replace: true });
    };
    const renderMenuPerfil = (
        <Menu
            id="basic-menu"
            anchorEl={anchorElPerfil}
            open={menuOpenPerfil}
            onClose={handleMenuPerfilClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleMenuPerfil}>
                <ListItemIcon>
                    <Person fontSize="small" />
                </ListItemIcon>
                Perfil
            </MenuItem>
            <MenuItem onClick={handleMenuCuenta}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Cuenta
            </MenuItem>
            <MenuItem onClick={handleMenuPerfilLogOut}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Cerrar Sesión
            </MenuItem>
        </Menu>
    );

    // ----------------------------MENU NOTIFICACIONES---------------------------------------
    const [anchorElNotificacion, setAnchorElNotificacion] = useState(null);
    const menuOpenNotificacion = Boolean(anchorElNotificacion);
    const handleMenuNotificacionOpen = (event) => {
        setAnchorElNotificacion(event.currentTarget);
    };
    const handleMenuNotificacionClose = () => {
        setAnchorElNotificacion(null);
    };
    const renderMenuNotificaciones = (
        <Menu
            id="basic-menu"
            anchorEl={anchorElNotificacion}
            open={menuOpenNotificacion}
            onClose={handleMenuNotificacionClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

        >
            <MenuItem onClick={handleMenuNotificacionClose} >
                <ListItem alignItems="flex-start" >
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary="otro txto"
                    />
                </ListItem>

            </MenuItem>
            <Divider variant="inset" component="li" />
            <MenuItem onClick={handleMenuNotificacionClose}>
                <Typography variant="inherit" noWrap>
                    A very long text that overflows
                </Typography>
            </MenuItem>
            <Divider variant="inset" component="li" />
            <Stack onClick={handleMenuNotificacionClose}>
                <Stack direction='row' justifyContent='space-between'>
                    <Settings fontSize="small" />
                    <Typography>hols</Typography>
                </Stack>
            </Stack>
            <Divider variant="inset" component="li" />
            <MenuItem onClick={handleMenuNotificacionClose}>
                <ListItemIcon>
                    <Typography>Titulo</Typography>
                </ListItemIcon>
                close
            </MenuItem>
        </Menu>
    );

    // ----------------------------MENU MENSAJES---------------------------------------
    const [anchorElMensaje, setAnchorElMensaje] = useState(null);
    const menuOpenMensaje = Boolean(anchorElMensaje);
    const handleMenuMensajeOpen = (event) => {
        setAnchorElMensaje(event.currentTarget);
    };
    const handleMenuMensajeClose = () => {
        setAnchorElMensaje(null);
    };
    const renderMenuMensajes = (
        <Menu
            id="basic-menu"
            anchorEl={anchorElMensaje}
            open={menuOpenMensaje}
            onClose={handleMenuMensajeClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

        >
            <MenuItem onClick={handleMenuMensajeClose} >
                <ListItem alignItems="flex-start" >
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary="otro txto"
                    />
                </ListItem>

            </MenuItem>
            <Divider variant="inset" component="li" />
            <MenuItem onClick={handleMenuMensajeClose}>
                <Typography variant="inherit" noWrap>
                    A very long text that overflows
                </Typography>
            </MenuItem>
            <Divider variant="inset" component="li" />
            <MenuItem onClick={handleMenuMensajeClose}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Cuenta
            </MenuItem>
            <Divider variant="inset" component="li" />
            <MenuItem onClick={handleMenuMensajeClose}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Ver más
            </MenuItem>
        </Menu>
    );



    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        PoSale sucursal
                    </Typography>
                    {/* ----------------------------Menu------------------------- */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }} onClick={handleClickRoute(item)}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}> */}
                    <Box sx={{ display: 'flex' }}>
                        <Tooltip title="Mensajes">
                            <IconButton size="large" aria-label="show 4 new mails"
                                aria-controls={menuOpenMensaje ? 'basic-menu' : undefined}
                                aria-expanded={menuOpenMensaje ? 'true' : undefined}
                                onClick={handleMenuMensajeOpen}
                                color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Notificaciones">
                            <IconButton
                                size="large"
                                id="basic-button"
                                aria-label="mostrar notificaciones"
                                aria-haspopup="true"
                                aria-controls={menuOpenNotificacion ? 'basic-menu' : undefined}
                                aria-expanded={menuOpenNotificacion ? 'true' : undefined}
                                onClick={handleMenuNotificacionOpen}
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Configuraciones">
                            <IconButton
                                size="large"
                                edge="end"
                                id="basic-button"
                                aria-controls={menuOpenPerfil ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={menuOpenPerfil ? 'true' : undefined}
                                onClick={handleMenuPerfilOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                    </Box>

                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Typography>
                    Lorem ipsum
                </Typography>
            </Box>
            {/* render menus ocultos hasta ser activados */}
            {renderMenuPerfil}
            {renderMenuNotificaciones}
            {renderMenuMensajes}
        </Box>
    );
}

DrawerAppBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DrawerAppBar;
