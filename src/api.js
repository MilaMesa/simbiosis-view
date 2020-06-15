const urlBase = 'http://localhost:8081/'

const ofertasAPI = {
    all: () => {
        fetch(`${urlBase}oferta/all`)
            .then(async response => {
                return await response.json();
            })
            .catch(error => {
                console.error('There was an errorOcurrio un error conusltado las ofertas!', {error});
            });
            return [];
    },
    get: function (id) {
        return this.users.find(u => u.id === id);
    }
};

export default ofertasAPI;
