const Sequelize = require("sequelize");
const Connection = require("./Connection");

const Client = Connection.define('clientes', {
    nome: {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    observacao: {
        type: Sequelize.TEXT
    }
});

module.exports = Client;