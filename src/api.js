export const urlBase = 'http://localhost:8080/'

const ofertasAPI = {
    all: async () => {
        try {
            const response = await fetch(`${urlBase}oferta/all`);
            return response.json();
        }
        catch (error) {
            console.error('There was an errorOcurrio un error consultado las ofertas!', { error });
        };
        return [];
    },
    crear: async (oferta) => {
        try {
            const response = await fetch(`${urlBase}oferta/crear`, {
                method: 'POST',
                body: JSON.stringify(oferta),
                headers: {
                    'Content-Type': 'application/json'
                }
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
            const response = await fetch(`${urlBase}oferta/${id}`);
            return response.json();
        }
        catch (error) {
            console.log('Ocurrio un error obteniendo la oferta' + id, { error });
            return error ? error : {};
        }
    }
};

export default ofertasAPI;
