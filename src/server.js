require('dotenv/config');
const Express = require("express");
const Cors = require("cors");
const Routes = require("./routes");
const Path = require("path");
const ClientController = require("./controllers/ClientController");

const server = Express();
server.use(Cors());
server.use(Express.urlencoded({ extended: false }));
server.use(Express.json());
server.use(Routes);
server.use("/public", Express.static(Path.resolve(__dirname, "..", "public")));

server.listen(process.env.SERVER_PORT, async () => {
    console.log("Server running...");
    await ClientController.verifyTable().catch(() => {
        console.log("Terminating server execution...");
        process.exit();
    });
});


