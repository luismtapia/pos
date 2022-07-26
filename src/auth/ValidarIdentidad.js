import { setLocalStorage, getLocalStorage, deleteLocalStorage } from './LocalStorage';
import { URLSesiones } from '../utils/URLs';
import { key_nombre, key_rol, key_token, key_user } from './config';
let usuario = { user: getLocalStorage(key_user), token: getLocalStorage(key_token), rol: getLocalStorage(key_rol) };
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
    usuario.mensaje = `Bienvenido ${resultado.respuesta.nombre}`;
    usuario.error = '';

    // PERSISTENCIA LOCAL
    setLocalStorage(key_rol, resultado.respuesta.rol);
    setLocalStorage(key_user, resultado.respuesta.usuario);
    setLocalStorage(key_nombre, resultado.respuesta.nombre);
    setLocalStorage(key_token, resultado.respuesta.token);

    return usuario;
};

//validar sesion
const ValidateSession = async () => { // hacer async
    const tokenLocal = getLocalStorage(key_token); //token local
    if (!tokenLocal) return usuario;

    const opciones = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenLocal}` }
    }
    const validar = await obtenerDatos('validar', opciones); // token Api

    const tokenRemota = validar.token;

    // si tokens son diferentes no esta logeado
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