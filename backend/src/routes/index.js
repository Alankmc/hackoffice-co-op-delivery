const { Router } = require("express");
const users = require("./users");
const compras = require("./compras");
const cors = require('cors');

module.exports = () => {
    const app = Router();

    // Apenas durante dev! Para frontend fazer as requisições tranquilo
    app.use(cors());

    users(app);
    compras(app);

    return app
}