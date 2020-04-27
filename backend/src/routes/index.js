const { Router } = require("express");
const users = require("./users");
const compras = require("./compras");

module.exports = () => {
    const app = Router();
    users(app);
    compras(app);

    return app
}