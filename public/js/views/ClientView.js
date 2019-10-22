class ClientView {
    constructor() {
        this._inputSearch = this.captureField("#inputSearch");
        this._fieldsForm = this.captureField(".fieldsForm");
    }

    renderClient(data) {
        if (data != null) {
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

    get fieldsForm(){
        return this._fieldsForm;
    }
}

export default ClientView;