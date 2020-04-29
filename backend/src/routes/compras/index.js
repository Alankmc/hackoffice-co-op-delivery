const { Router } = require("express");
const { listCompras, getCompra, addCompra, updateCompra, assignCompra, deliverCompra, cancelCompra, validatePostParams } = require("../../controllers/compras");

// Adding this to test out FE loading screens, whenever needed
const delay = (callback) => {
    setTimeout(callback, 1000);
}

module.exports = (app) => {
    const route = Router();

    app.use("/compras", route);

    route.get('/', async (req, res) => res.send(await listCompras()));
    route.get('/:id', (req, res) => res.send(getCompra(req, res)));

    route.post('/', validatePostParams(), addCompra);

    route.put('/:id', (req, res) => updateCompra(req, res));
    route.put('/:id/atribuir', (req, res) => assignCompra(req, res));
    route.put('/:id/entregar', (req, res) => deliverCompra(req, res));
    route.put('/:id/cancelar', (req, res) => cancelCompra(req, res));
}
