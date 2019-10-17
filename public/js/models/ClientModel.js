class ClientModel {
    constructor() {
    }

    async searchClients() {
        return new Promise((resolve, reject) => {
            $.get("http://localhost:1234/read/clients").done(data => {
                (data.response && data.info) ? resolve(data.info) : resolve(null);
            }).fail(error => {
                console.error(error);
                resolve(null);
            });
        });
    }

}

export default ClientModel;