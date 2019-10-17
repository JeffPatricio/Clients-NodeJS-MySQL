class ClientView {
    constructor() {
        this._inputSearch = this.captureField("#inputSearch");
    }

    renderClient(data) {
        if (data) {
            const { num, name, phone, cpf } = data;
            const struct = $("#tempRowTable").html();
            const row = Mustache.render(struct, { num, name, phone, cpf });
            $("#bodyTableClients").append(row);
            $("#tableClients").show();
        } else {
            $("#tableClients").hide();
            $("#clientsEmptyInfo").show();
        }
    }

    openModal(selector) {
        $(selector).modal();
    }

    closeModal(selector) {
        $(selector).modal("hide");
    }

    showElement(selector) {
        $(selector).show();
    }

    closeElement(selector) {
        $(selector).hide();
    }

    captureField(selector) {
        return $(selector);
    }

    get inputSearch() {
        return this._inputSearch;
    }
}

export default ClientView;