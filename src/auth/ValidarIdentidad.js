// import React, { useState } from "react";

const ValidarUsuario = (user, password) => {
    let usuario = { user: '', password: '', token: '', rol: '', permiso: 'denegado' };
    let rol = '';
    let token = '';

    //ejemplo admin
    if (user === 'luis' && password === '123') { // comparo con api
        // simulo token de BD diferente de vacio
        token = 'abc';
        rol = 'admin';
    }
    // ejemplo user
    if (user === 'otro' && password === '123') { // comparo con api
        // simulo token de BD diferente de vacio
        token = 'abd';
        rol = 'usuario';
    }

    if (token !== '') {
        usuario.user = user;
        usuario.password = password;
        usuario.token = token;
        usuario.rol = rol;
        usuario.permiso = 'permitido';

        //usuario = { user: 'luis', password: '123', token: token, permiso: 'permitido' };
    }

    return usuario;
}

export default ValidarUsuario;