const { Router } = require("express");
const { listCompras, getCompra } = require("../../services/compras");

module.exports = (app) => {
    const route = Router();

    app.use("/compras", route);

    route.get('/', (req, res) => res.send(listCompras()));
    route.get('/:id', (req, res) => res.send(getCompra(req, res)));
}
