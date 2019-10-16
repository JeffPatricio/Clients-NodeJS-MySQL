const Express = require("express");
const Routes = Express.Router();
const ClientController = require("./controllers/ClientController");

Routes.post("/new/client", ClientController.create);

Routes.get("/read/clients", ClientController.list);

Routes.get("/read/client/:cpf", ClientController.read);

Routes.put("/update/client/:cpf", ClientController.update);

Routes.delete("/delete/client/:cpf", ClientController.delete);

Routes.get("/", (req, res) => { res.send("<h3>Server running...</h3>"); });

module.exports = Routes;