import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { Badge, Menu, MenuItem, Button, Typography, ListItem, ListItemButton, ListItemText, Toolbar, ListItemIcon } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import { LogOut } from '../auth/ValidarIdentidad';


const drawerWidth = 240;
const navItems = ['Inicio', 'Sucursales', 'Usuarios', 'Categorías', 'Marcas', 'Proveedores', 'Artículos', 'Ventas', 'Compras'];
const navItemsUser = ['Inicio', 'Ventas', 'Compras'];

function DrawerAppBar(props) {
    const { window } = props;

    //
    let navigate = useNavigate();

    const handleClickRoute = (item) => (event) => {
        navigate(`/${item}`, { replace: true });
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

    // Menus despegables
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const handleMenuPerfilOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuPerfilClose = () => {
        setAnchorEl(null);
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


    const renderMenuPerfil = (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuPerfilClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={handleMenuPerfil}>Perfil</MenuItem>
            <MenuItem onClick={handleMenuPerfilClose}>My cuenta sucursales</MenuItem>
            <MenuItem onClick={handleMenuPerfilLogOut}>Cerrar Sesión</MenuItem>
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
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            id="basic-button"
                            aria-controls={menuOpen ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={menuOpen ? 'true' : undefined}
                            onClick={handleMenuPerfilOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
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
