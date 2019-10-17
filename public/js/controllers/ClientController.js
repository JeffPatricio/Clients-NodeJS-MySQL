import ClientModel from "../models/ClientModel.js";
import ClientView from "../views/ClientView.js";

class ClientController {
    constructor() {
        this._clientModel = new ClientModel();
        this._clientView = new ClientView();
        this.addEvents();
        this._clientList = this.listClients();
    }

    addEvents() {
        $("#btnAddClient").click(() => {
            alert("click");
        });

        $(".btnView").click(() => {
            alert("click");
        });
        $(".btnDelete").click(() => {
            alert("click");
        });
    }

    listClients() {
        this.clientModel.searchClients().then(data => {
            this.clientList = data;
            if (data) {
                this.clientList.forEach((client, index) => {
                    client.num = index + 1;
                    this.clientView.renderClient(client);
                });
            } else {
                this.clientView.renderClient(null);
            }
        }).catch(() => {
            this.clientList = null
            this.clientView.renderClient(null);
        });

        setTimeout(() => {
            this.clientView.closeElement("#loading");
            this.clientView.showElement("#cardMain");
        }, 1000);
    }

    get clientModel() {
        return this._clientModel;
    }
    get clientView() {
        return this._clientView;
    }
    get clientList() {
        return this._clientList;
    }
    set clientList(list) {
        this._clientList = list;
    }
}

const clientController = new ClientController();
export default clientController;