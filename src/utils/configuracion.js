//----------------------------------IMPORTA---------------------------------------
//--------------------------------------------------------------------------------
import { getLocalStorage } from "../auth/LocalStorage";


//----------------------------------CONSTANTES---------------------------------------
//-----------------------------------------------------------------------------------


// LOCALSTORAGE
const key_token = 'token_pos', key_user = 'user_pos', key_rol = 'rol_pos', key_nombre = 'nombre_pos', key_empresa = 'empresa_pos', key_sucursal = 'sucursal_pos';

// OPCIONES PARA PETICIONES
const tokenLocal = getLocalStorage(key_token);
const Authorization = `Bearer ${tokenLocal}`;

const opcionesGET = () => ({
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': Authorization },
})
const opcionesPOST = (body) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': Authorization },
    body: JSON.stringify(body)
});
const opcionesPUT = (body) => ({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': Authorization },
    body: JSON.stringify(body)
});


// ENDPOINTS
const endpoint = 'https://poszeco-api.herokuapp.com/pos';
//const endpoint = 'http://localhost:4001/pos';

const URLMarcas = `${endpoint}/marcas`;
const URLUsuarios = `${endpoint}/usuarios`;
const URLSesiones = `${endpoint}/sesiones`;
const URLProductos = `${endpoint}/productos`;
const URLCategorias = `${endpoint}/categorias`;
const URLProveedores = `${endpoint}/proveedores`;
const URLSucursales = `${endpoint}/sucursales`;
const URLAuth = `${endpoint}/sesiones/validar`;
const URLLogin = `${endpoint}/sesiones/login`;
const URLSignUp = `${endpoint}/sesiones/signup`;


//----------------------------------EXPORTA---------------------------------------
//--------------------------------------------------------------------------------

export {
    opcionesGET, opcionesPOST, opcionesPUT,
    key_user, key_rol, key_token, key_nombre, key_empresa, key_sucursal,
    URLMarcas, URLUsuarios, URLSesiones, URLProductos, URLCategorias, URLProveedores, URLSucursales,
    URLAuth, URLLogin, URLSignUp

}

