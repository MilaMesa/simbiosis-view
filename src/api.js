export const urlBase = 'http://localhost:8080/'

const ofertasAPI = {
    all: async () => {
        try {
            const response = await fetch(`${urlBase}oferta/all`);
            return response.json();
        }
        catch (error) {
            console.error('There was an errorOcurrio un error conusltado las ofertas!', { error });
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
    get: function (id) {
        return this.users.find(u => u.id === id);
    }
};

export default ofertasAPI;
