const { Router } = require("express");
const { listCompras, getCompra, addCompra, updateCompra, assignCompra, unassignCompra, deliverCompra, cancelCompra, validatePostParams } = require("../../controllers/compras");
const { authenticateUser } = require("../../services/users");

module.exports = (app) => {
    const route = Router();

    app.use("/compras", route);

    route.get('/', (req, res) => res.send(listCompras()));
    route.get('/:id', (req, res) => res.send(getCompra(req, res)));

    route.post('/', [authenticateUser], validatePostParams(), addCompra);

    route.put('/:id', [authenticateUser], (req, res) => updateCompra(req, res));
    route.put('/:id/atribuir', [authenticateUser], (req, res) => assignCompra(req, res));
    route.put('/:id/desatribuir', [authenticateUser], (req, res) => unassignCompra(req, res));
    route.put('/:id/entregar', [authenticateUser], (req, res) => deliverCompra(req, res));
    route.put('/:id/cancelar', [authenticateUser], (req, res) => cancelCompra(req, res));
}
