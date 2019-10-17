const Sequelize = require("sequelize");
const Connection = require("./Connection");

const Client = Connection.define('clients', {
    name: {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    dateBirth: {
        type: Sequelize.DATE,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    note: {
        type: Sequelize.TEXT
    }
});

module.exports = Client;