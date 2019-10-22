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
            $("#modalNewClient").modal();
        });

        $(".btnView").click(() => {
            alert("click");
        });

        $(".btnDelete").click(() => {
            alert("click");
        });

        $("#btnSaveClient").click(() => {
            console.log(this.clientView.fieldsForm[0]);
            this.clientModel.validateFieldsNewClient(this.clientView.fieldsForm);
        });

        $("#inputPhone, #inputCpf").on("input", function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });

        $("#inputDateBirth").attr("max", () => {
            const date = new Date();
            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

            function pad(n) {
                return n < 10 ? "0" + n : n;
            }
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
            setTimeout(() => {
                this.clientView.closeElement("#loading");
                this.clientView.showElement("#cardMain");
            }, 500);
        }).catch(() => {
            this.clientList = null
            this.clientView.renderClient(null);
            setTimeout(() => {
                this.clientView.closeElement("#loading");
                this.clientView.showElement("#cardMain");
            }, 500);
        });
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