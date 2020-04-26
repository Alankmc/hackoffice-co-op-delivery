const compraService = require("../../services/compras");

const listCompras = () => compraService.listCompras();

const getCompra = (request, response) => {
    const compraId = request.params.id;

    if (!compraId) {
        return listCompras();
    }

    const compra = compraService.getCompraById(compraId);

    if (!compra) {
        response.statusCode = 404;
        response.json({message: `Compra ${compraId} not found.` });
    }

    return compra;
}

const addCompra = (request, response) => {
    // TODO: create model;
    const newCompra = request.body;
    
    compraService.addCompra(newCompra);

    return response.status(201).json(newCompra);
}

const updateCompra = (request, response) => {
    const compraId = request.params.id;

    if (!compraId) {
        return response
            .status(400)
            .send({ message: 'Missing path param id.' });
    }

    const compraUpdate = request.body;
    const updatedCompra = compraService.updateCompra(compraId, compraUpdate);
    if (!updatedCompra) {
        return response.status(400).json({message: `Error when updated compra ${compraId}`});
    }

    return response.status(200).json(updatedCompra);    
}

const assignCompra = (request, response) => {
    const compraId = request.params.id;
    if (!compraId) {
        return response
            .status(400)
            .send({ message: 'Missing path param id.' });
    }

    const compra = compraService.assignCompra(compraId);
    if (!compra) {
        return response
            .status(409)
            .send({ message: `Compra ${compraId} cannot be assigned due to its current status.` });
    }

    return response.status(200).json(compra);
}

const deliverCompra = (request, response) => {
    const compraId = request.params.id;
    if (!compraId) {
        return response
            .status(400)
            .send({ message: 'Missing path param id.' });
    }

    const compra = compraService.deliverCompra(compraId);
    if (!compra) {
        return response
            .status(409)
            .send({ message: `Compra ${compraId} cannot be delivered due to its current status.` });
    }

    return response.status(200).json(compra);
}

const cancelCompra = (request, response) => {
    const compraId = request.params.id;
    if (!compraId) {
        return response
            .status(400)
            .send({ message: 'Missing path param id.' });
    }

    const compra = compraService.cancelCompra(compraId);
    if (!compra) {
        return response
            .status(409)
            .send({ message: `Compra ${compraId} cannot be cancelled due to its current status.` });
    }

    return response.status(200).json(compra);
}

const validatePostParams = function() {
    const requiredParams = ['nome', 'validade', 'localEntrega', 'itens'];

    const checkParamPresent = function(body, paramName) {
        return (body[paramName]);
    }

    return function (request, response, next) {
        const body = (request.body);

        for (let param of requiredParams) {
            if (!checkParamPresent(body, param)) {
                return response
                    .status(422)
                    .send({ message: `Missing param ${param}.` });
            }
        }

        next();
    }
}

module.exports = {
    listCompras,
    getCompra,
    addCompra,
    updateCompra,
    assignCompra,
    deliverCompra,
    cancelCompra,
    validatePostParams
}