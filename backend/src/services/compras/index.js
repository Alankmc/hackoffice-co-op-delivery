const { Compra } = require('../../model/compra.js');

const status = {
    NEW: 'NEW',
    ASSIGNED: 'ASSIGNED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED'
}

const compras = [{ 
    id: 1, 
    nome: "João",
    validade: 1587853511000, 
    localCompra: 'Supermercado Pague Menos', 
    localEntrega: "Rua XV de Novembro, 400 - Indaiatuba - SP",
    status: status.NEW,
    itens: ["2 sacos de arroz 5kg", "5 maçãs", "3 abacaxis"],
    observaoes: "Posso fazer o pick-up no seu porta-malas"
}]

const listCompras = () => compras

const getCompra = (request, response) => {
    const compraId = request.params.id;

    if (!compraId) {
        return listCompras();
    }

    const compra = getCompraById(compraId, response);

    if (!compra) {
        return response
            .status(404)
            .send({ message: `Compra ${compraId} not found.` });
    }

    return compra;
}

const addCompra = (request, response) => {
    const newCompra = request.body;
    newCompra['status'] = status.NEW;

    // TODO: insert on DB
    compras.push(newCompra);

    return response.status(201).json(newCompra);
}

const updateCompra = (request, response) => {
    const compraId = request.params.id;

    if (!compraId) {
        return response
            .status(400)
            .send({ message: 'Missing path param id.' });
    }

    const existentCompra = getCompraById(compraId, response);
    const updatedCompra = request.body;

    for (let property in updatedCompra) {
        existentCompra[property] = updatedCompra[property];
    }

    // TODO: update on DB

    return response.status(200).json(updatedCompra);
}

const assignCompra = (request, response) => {
    const compraId = request.params.id;
    let compra = getCompraById(compraId, response);

    if (compra.status != status.NEW) {
        return response
            .status(409)
            .send({ message: `Compra ${compraId} cannot be assigned due to its current status.` });
    }

    const assigneeId = 'XPTO'; // TODO: Define how to get userId here.

    compra['status'] = status.ASSIGNED;
    compra['assigneeId'] = assigneeId;

    // TODO: update on DB

    return response.status(200).json(compra);
}

const deliverCompra = (request, response) => {
    const compraId = request.params.id;
    let compra = getCompraById(compraId, response);

    if (compra.status != status.ASSIGNED) {
        return response
            .status(409)
            .send({ message: `Compra ${compraId} cannot be delivered due to its current status.` });
    }

    compra['status'] = status.DELIVERED;

    // TODO: update on DB

    return response.status(200).json(compra);
}

const cancelCompra = (request, response) => {
    const compraId = request.params.id;
    let compra = getCompraById(compraId, response);

    if (compra.status == status.DELIVERED) {
        return response
            .status(409)
            .send({ message: `Compra ${compraId} cannot be cancelled due to its current status.` });
    }

    compra['status'] = status.CANCELLED;

    // TODO: update on DB

    return response.status(200).json(compra);
}

// TODO: findById from DB
function getCompraById(compraId, response) {
    const compra = listCompras().find(c => c.id == compraId)

    if (!compra) {
        return response
            .status(404)
            .send({ message: `Compra ${compraId} not found.` });
    }

    return compra;
}

const validatePostParams = function() {
    const requiredParams = ['nome', 'validade', 'localEntrega', 'itens'];

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

const checkParamPresent = function (body, paramName) {
    return (body[paramName]);
};

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