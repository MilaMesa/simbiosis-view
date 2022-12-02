import { loginSimbiosisAppToken } from "./constants";

export const urlBase = 'http://localhost:8080/';

const ofertasAPI = {
    all: async () => {
        try {
            const response = await fetch(`${urlBase}oferta/all`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': window.localStorage.getItem(loginSimbiosisAppToken)
                })
            });
            return response ? response.json() : [];
        }
        catch (error) {
            console.error('Ocurrio un error consultado las ofertas!', { error });
        };
        return [];
    },
    crear: async (oferta) => {
        try {
            const response = await fetch(`${urlBase}oferta/crear`, {
                method: 'POST',
                body: JSON.stringify(oferta),
                headers: new Headers({
                    'Authorization': window.localStorage.getItem(loginSimbiosisAppToken),
                    'Content-Type': 'application/json',
                })
            });
            return response.json();
        }
        catch (error) {
            console.log('Ocurrio un error creando la oferta', { error });
            return error ? error : {};
        }
    },
    get: async (id) => {
        try {
            const response = await fetch(`${urlBase}oferta/${id}`, {
                headers: new Headers({
                    'Authorization': window.localStorage.getItem(loginSimbiosisAppToken)
                })
            });
            return response.json();
        }
        catch (error) {
            console.log('Ocurrio un error obteniendo la oferta' + id, { error });
            return error ? error : {};
        }
    },
    eliminar: async (id) => {
        try {
            const response = await fetch(`${urlBase}oferta/eliminar/${id}`, {
                method: 'POST',
                body: '',
                headers: new Headers({
                    'Authorization': window.localStorage.getItem(loginSimbiosisAppToken),
                    'Content-Type': 'application/json',
                })
            });
            return response;
        }
        catch (error) {
            console.log('Ocurrio un error eliminano la oferta' + id, { error });
            return error ? error : {};
        }
    }
};

export const insumosAPI = {
    all: async () => {
        try {
            const response = await fetch(`${urlBase}insumo/all`, {
                headers: new Headers({
                    'Authorization': window.localStorage.getItem(loginSimbiosisAppToken)
                })
            });
            return response.json();
        }
        catch (error) {
            console.error('Ocurrido un error consultando los insumos', { error });
        };
        return [];
    },
    allUser: async (id) => {
        try {
            const response = await fetch(`${urlBase}insumo/all/${id}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': window.localStorage.getItem(loginSimbiosisAppToken)
                })
            });
            return response.json();
        }
        catch (error) {
            console.error('Ocurrido un error consultando los insumos', { error });
        };
        return [];
    },
    agotado: async () => {
        try {
            const response = await fetch(`${urlBase}insumo/agotado`, {
                headers: new Headers({
                    'Authorization': window.localStorage.getItem(loginSimbiosisAppToken)
                })
            });
            return response.json();
        }
        catch (error) {
            console.error('Ocurrido un error consultando los insumos agotados', { error });
        };
        return [];
    },
    actualizar: async (codigo, cantidad) => {
        try {
            const response = await fetch(`${urlBase}insumo/${codigo}/actualizar/${cantidad}`,
                {
                    method: 'POST',
                    body: '',
                    headers: new Headers({
                        'Authorization': window.localStorage.getItem(loginSimbiosisAppToken),
                        'Content-Type': 'application/json',
                    })
                });
            return response.json();
        }
        catch (error) {
            console.error('Ocurrido un error actualizando el insumo', { error });
        };
        return 0;
    },
    crear: async (insumo) => {
        try {
            const response = await fetch(`${urlBase}insumo/crear`,
                {
                    method: 'POST',
                    body: JSON.stringify(insumo),
                    headers: new Headers({
                        'Authorization': window.localStorage.getItem(loginSimbiosisAppToken),
                         'Content-Type': 'application/json',
                    })
                });
            return response.json();
        }
        catch (error) {
            console.error('Ocurrido un error creando el insumo', { error });
            return error ? error : {};
        }
    }
};

export const perfilAPI = {
    get: async (id) => {
        try {
            const response = await fetch(`${urlBase}perfil/${id}`, {
                headers: new Headers({
                    'Authorization': window.localStorage.getItem(loginSimbiosisAppToken)
                })
            });
            return response.json();
        } catch (error) {
            console.log('Ocurrio un error obteniendo el perfil ' + id, { error });
            return error ? error : {};
        }
    },
};

export default ofertasAPI;
