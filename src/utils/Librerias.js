
//----------------------------------FUNCIONES---------------------------------------
//-----------------------------------------------------------------------------------
const eliminaAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}



//----------------------------------PETICIONES---------------------------------------
//-----------------------------------------------------------------------------------
const getData = async (endpoint, opciones) => {
    //console.log(opciones);
    const response = await fetch(endpoint, opciones);
    //console.log(response);
    const datos = await response.json();
    //console.log(datos);

    return datos;
}

export { eliminaAcentos, getData }