const Connection = require("../models/Connection");
const Client = require("../models/Client");
const tablename = "clientes";

module.exports = {

    create(req, res) {
        const { client } = req.body;
        Client.findByPk(client.cpf).then(response => {
            if (!response) {
                Client.create(client).then(response => {
                    res.status(200);
                    res.json({ response: true, info: response });
                }).catch(error => {
                    res.status(500);
                    res.json({ response: false, info: error.parent.sqlMessage });
                });
            } else {
                res.status(200);
                res.json({ response: false, info: "Informed CPF is already registered." });
            }
        }).catch(error => {
            res.status(500);
            res.json({ response: false, info: error.parent.sqlMessage });
        });
    },

    read(req, res) {
        const { cpf } = req.params;
        Client.findByPk(cpf, { attributes: ["nome", "cpf", "dataNascimento", "telefone", "endereco", "observacao"] }).then(response => {
            res.status(200);
            res.json({ response: true, info: response });
        }).catch(error => {
            res.status(500);
            res.json({ response: false, info: error.parent.sqlMessage });
        });
    },

    update(req, res) {
        const { cpf } = req.params;
        const { dataClient } = req.body;

        (dataClient.hasOwnProperty("cpf")) ? delete dataClient.cpf : null;

        Client.update(dataClient, { where: { cpf: cpf } }).then(response => {
            res.status(200);
            const clienteUpdated = response > 0 ? "Client updated successfully." : "Error updating client.";
            res.json({ response: clienteUpdated != null, info: clienteUpdated });
        }).catch(error => {
            res.status(500);
            res.json({ response: false, info: error });
        });
    },

    delete(req, res) {
        const { cpf } = req.params;
        Client.findAndDelete(cpf).then(response => {
            res.status(200);
            const clienteDeleted = response > 0 ? "Client deleted successfully." : "Error deleting client.";
            res.json({ response: clienteDeleted != null, info: clienteDeleted });
        }).catch(error => {
            res.status(500);
            res.json({ response: false, info: error });
        });
    },

    list(req, res) {
        Client.findAll({ attributes: ["nome", "cpf", "dataNascimento", "telefone", "endereco", "observacao"] }).then(response => {
            res.status(200);
            res.json({ response: true, info: response });
        }).catch(error => {
            res.status(500);
            res.json({ response: false, info: error.parent.sqlMessage });
        });
    },

    verifyTable() {
        return new Promise((resolve, reject) => {
            Connection.getQueryInterface().showAllSchemas().then(tables => {
                const existingTables = [];
                tables.forEach(table => { existingTables.push(Object.values(table)[0]) });
                if (existingTables.includes(tablename)) {
                    console.log("The clients table already exists in the database.");
                    resolve(true);
                } else {
                    Client.sync({ force: true }).then(() => {
                        console.log("Table successfully generated.");
                        resolve(true);
                    }).catch(error => {
                        console.log("Error generating table: ", error);
                        reject(false);
                    });
                }
            }).catch(error => {
                console.log("Error fetching registered tables: ", error);
                reject(false);
            });
        });
    }
}


