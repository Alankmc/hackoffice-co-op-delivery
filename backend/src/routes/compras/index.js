const { Router } = require("express");
const { listCompras, getCompra, addCompra, updateCompra, assignCompra, deliverCompra, cancelCompra, validatePostParams } = require("../../controllers/compras");

module.exports = (app) => {
    const route = Router();

    app.use("/compras", route);

    route.get('/', (req, res) => res.send(listCompras()));
    route.get('/:id', (req, res) => res.send(getCompra(req, res)));

    route.post('/', validatePostParams(), addCompra);

    route.put('/:id', (req, res) => updateCompra(req, res));
    route.put('/:id/atribuir', (req, res) => assignCompra(req, res));
    route.put('/:id/entregar', (req, res) => deliverCompra(req, res));
    route.put('/:id/cancelar', (req, res) => cancelCompra(req, res));
}
