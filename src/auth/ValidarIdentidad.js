import { setLocalStorage, getLocalStorage, deleteLocalStorage } from './LocalStorage';

import { URLSesiones, key_nombre, key_rol, key_token, key_user, key_empresa, key_sucursal, opcionesGET } from '../utils/configuracion';

let usuario = { user: getLocalStorage(key_user), token: getLocalStorage(key_token), rol: getLocalStorage(key_rol) };
//validar y regresar info necesaria
// estatus, nombre, descripcion agregar a local??
const obtenerDatos = async (ruta, opciones) => {
    const response = await fetch(`${URLSesiones}/${ruta}`, opciones);
    const datos = await response.json();
    return datos;
}



// Iniciar sesion
const LogIn = async (user, password) => {
    // si usuario y contraseña son correctos resultado da token
    const opciones = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user, password: password })
    }
    const resultado = await obtenerDatos('login', opciones);// resultado de Api 

    if (resultado.error) {
        usuario.mensaje = resultado.mensaje;
        usuario.error = resultado.error;
        return usuario;
    }
    // SIN PERSISTENCIA
    usuario.user = resultado.respuesta.usuario;
    usuario.token = resultado.respuesta.token;
    usuario.rol = resultado.respuesta.rol;
    usuario.empresa = resultado.respuesta.empresa;
    usuario.sucursal = resultado.respuesta.sucursal;
    usuario.mensaje = `Bienvenido ${resultado.respuesta.nombre}`;
    usuario.error = '';

    // PERSISTENCIA LOCAL
    setLocalStorage(key_rol, resultado.respuesta.rol);
    setLocalStorage(key_user, resultado.respuesta.usuario);
    setLocalStorage(key_nombre, resultado.respuesta.nombre);
    setLocalStorage(key_token, resultado.respuesta.token);
    setLocalStorage(key_empresa, resultado.respuesta.empresa);
    setLocalStorage(key_sucursal, resultado.respuesta.sucursal);

    return usuario;
};

//signUp

//validar sesion
const ValidateSession = async () => { // hacer async
    const tokenLocal = getLocalStorage(key_token); //token local
    if (!tokenLocal) return usuario;

    const validar = await obtenerDatos('validar', opcionesGET()); // token Api

    const tokenRemota = validar.token;

    // si tokens son diferentes no esta logeado
    // cambiar a si es valido token??????? y i/playload
    if (tokenLocal !== tokenRemota) {
        LogOut();
    }
    return usuario;
};

// cerrar sesion
const LogOut = () => {
    // SIN PERSISTENCIA
    usuario.user = '';
    usuario.token = '';
    usuario.rol = '';
    usuario.nombre = '';
    usuario.mensaje = '';
    usuario.error = '';

    // PERSISTENCIA LOCAL
    deleteLocalStorage(key_token);
    deleteLocalStorage(key_user);
    deleteLocalStorage(key_rol);
    deleteLocalStorage(key_nombre);
};

export { ValidateSession, LogIn, LogOut };