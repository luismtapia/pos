import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home as InicioIcon, ManageAccounts as UsuarioIcon, Class as CategoriaIcon, Storefront as ProductoIcon, Inventory as ProveedorIcon, ShoppingCartCheckout as VentasIcon, AddShoppingCart as ComprasIcon, Verified as MarcaIcon } from '@mui/icons-material';

export default function Menu(props) {
    const { auth } = props;


    const [value, setValue] = useState('inicio');

    const handleChange = (event, nuevoValor) => {
        setValue(nuevoValor);
    };

    // redirecciona a la ruta del menu seleccionado
    let navigate = useNavigate();
    const handleClickInicio = () => { navigate("/inicio", { replace: true }) };
    const handleClickMarca = () => { navigate("/marcas", { replace: true }) };
    const handleClickVentas = () => { navigate("/ventas", { replace: true }) };
    const handleClickCompras = () => { navigate("/compras", { replace: true }) };
    const handleClickUsuario = () => { navigate("/usuarios", { replace: true }) };
    const handleClickProducto = () => { navigate("/productos", { replace: true }) };
    const handleClickCategoria = () => { navigate("/categorias", { replace: true }) };
    const handleClickProveedor = () => { navigate("/proveedores", { replace: true }) };

    const MenuAdmin = () => (
        <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
            <BottomNavigationAction
                label="Inicio"
                value="inicio"
                icon={<InicioIcon />}
                onClick={handleClickInicio}
            />
            <BottomNavigationAction
                label="Usuario"
                value="usuario"
                icon={<UsuarioIcon />}
                onClick={handleClickUsuario}
            />
            <BottomNavigationAction
                label="Categoria"
                value="categoria"
                icon={<CategoriaIcon />}
                onClick={handleClickCategoria}
            />
            <BottomNavigationAction
                label="Producto"
                value="producto"
                icon={<ProductoIcon />}
                onClick={handleClickProducto}
            />
            <BottomNavigationAction
                label="Proveedor"
                value="proveedor"
                icon={<ProveedorIcon />}
                onClick={handleClickProveedor}
            />
            <BottomNavigationAction
                label="Marca"
                value="marca"
                icon={<MarcaIcon />}
                onClick={handleClickMarca}
            />
            <BottomNavigationAction
                label="Ventas"
                value="ventas"
                icon={<VentasIcon />}
                onClick={handleClickVentas}
            />
            <BottomNavigationAction
                label="Compras"
                value="compras"
                icon={<ComprasIcon />}
                onClick={handleClickCompras}
            />
        </BottomNavigation>
    );

    const MenuUsuario = () => (
        <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
            <BottomNavigationAction
                label="Ventas"
                value="ventas"
                icon={<VentasIcon />}
                onClick={handleClickVentas}
            />
            <BottomNavigationAction
                label="Compras"
                value="compras"
                icon={<ComprasIcon />}
                onClick={handleClickCompras}
            />
        </BottomNavigation>

    );

    return (
        <Stack direction='row' justifyContent='center'>
            {
                auth.rol === 'admin' ? <MenuAdmin /> : <MenuUsuario />
            }

        </Stack>

    );
}
