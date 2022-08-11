
import { setLocalStorage, getLocalStorage, deleteLocalStorage } from './LocalStorage';

import { URLSesiones, key_nombre, key_rol, key_token, key_user, key_empresa, key_sucursal, opcionesGET, getToken } from '../utils/configuracion';




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
    const resultado = await obtenerDatos('login', opciones);// resultado de Api // local fun porque no requiere auth
    console.log(resultado.respuesta.nombre);

    if (resultado.error) {
        usuario.mensaje = resultado.mensaje;
        usuario.error = resultado.error;
        return usuario;
    }
    persistencia(resultado.respuesta);
    usuario.mensaje = `Bienvenido ${resultado.respuesta.nombre}`;
    usuario.error = '';

    console.log('user', usuario);
    return usuario;
};

//signUp

//validar sesion
const ValidateSession = async () => { // hacer async
    const tokenLocal = getLocalStorage(key_token); //token local

    // usuario no ha iniciado sesion
    if (tokenLocal === null) return usuario;


    const Authorization = getToken();
    const validar = await obtenerDatos('validar', opcionesGET(Authorization)); // token Api

    // console.log("validatesession", validar);

    // si tokens son diferentes no esta logeado
    // cambiar a si es valido token??????? y i/playload
    if (!validar.idUsuario) {
        LogOut();
    }

    validar.token = tokenLocal;
    persistencia(validar);

    // usuario.idUsuario = validar.idUsuario;
    // usuario.token = tokenLocal;
    // usuario.rol = validar.rol;
    // usuario.empresa = validar.empresa;
    // usuario.sucursal = validar.sucursal;
    // usuario.idSucursal = validar.idSucursal;

    usuario.mensaje = '';
    usuario.error = '';
    // console.log("val:", validar);
    return usuario;
};

// cerrar sesion
const LogOut = () => {


    // SIN PERSISTENCIA
    usuario = {};

    // PERSISTENCIA LOCAL
    deleteLocalStorage(key_token);
    deleteLocalStorage(key_user);
    deleteLocalStorage(key_rol);
    deleteLocalStorage(key_nombre);
    deleteLocalStorage(key_sucursal);
    deleteLocalStorage(key_empresa);
};


const persistencia = (datos) => {
    // SIN PERSISTENCIA
    usuario.idUsuario = datos.idUsuario;
    usuario.user = datos.usuario;
    usuario.nombre = datos.nombre;
    usuario.token = datos.token;
    usuario.rol = datos.rol;
    usuario.estatus = datos.estatus;
    usuario.empresa = datos.empresa;
    usuario.sucursal = datos.sucursal;
    usuario.idSucursal = datos.idSucursal;

    // PERSISTENCIA LOCAL
    setLocalStorage(key_rol, datos.rol);
    setLocalStorage(key_user, datos.usuario);
    setLocalStorage(key_nombre, datos.nombre);
    setLocalStorage(key_token, datos.token);
    setLocalStorage(key_empresa, datos.empresa);
    setLocalStorage(key_sucursal, datos.sucursal);
}


export { ValidateSession, LogIn, LogOut };