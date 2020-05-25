const usersAPI = {
    users: [
        {
            id: 10950096,
            name: "Daniel Venegas",
            project: "CJeans"
        },
        {
            id: 4782502,
            name: "Javier Chaparro",
            project: "Kmetrics"
        },
        {
            id: 9085250,
            name: "Miguel Avendaño",
            project: "Kmetrics"
        }
    ],
    all: function() {
        return this.users;
    },
    get: function(id) {
        return this.users.find(u => u.id === id);
    }
};

export default usersAPI;
