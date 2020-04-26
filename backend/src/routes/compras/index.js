const { Router } = require("express");
const { listCompras, getCompra, addCompra, updateCompra, assignCompra, validatePostParams } = require("../../services/compras");

module.exports = (app) => {
    const route = Router();

    app.use("/compras", route);

    route.get('/', (req, res) => res.send(listCompras()));
    route.get('/:id', (req, res) => res.send(getCompra(req, res)));

    route.post('/', validatePostParams(), addCompra);

    route.put('/:id', (req, res) => res.send(updateCompra(req, res)));
    route.put('/:id/atribuir',(req, res) => res.send(assignCompra(req, res)));
}
