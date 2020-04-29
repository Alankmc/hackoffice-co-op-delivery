const compraService = require("../../services/compras");
const { Compra } = require('../../model/compra.js');

const listCompras = async () => await compraService.listCompras();

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

const addCompra = async (request, response) => {
    const newCompra = await compraService.addCompra(request.body);

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

const assignCompra = async (request, response) => {
    const compraId = request.params.id;
    if (!compraId) {
        return response
            .status(400)
            .send({ message: 'Missing path param id.' });
    }

    try {
        await compraService.assignCompra(compraId, request.body.assigneeId);
        return response.sendStatus(200);

    } catch (e) {
        return response.status(500).send(e)
    }
}

const deliverCompra = async (request, response) => {
    const compraId = request.params.id;
    if (!compraId) {
        return response
            .status(400)
            .send({ message: 'Missing path param id.' });
    }

    try {
        await compraService.deliverCompra(compraId);
        return response.sendStatus(200);

    } catch (e) {
        return response.status(500).send(e)
    }
    // if (!compra) {
    //     return response
    //         .status(409)
    //         .send({ message: `Compra ${compraId} cannot be delivered due to its current status.` });
    // }

}

const cancelCompra = async (request, response) => {
    const compraId = request.params.id;
    if (!compraId) {
        return response
            .status(400)
            .send({ message: 'Missing path param id.' });
    }

    try {
        await compraService.cancelCompra(compraId);
        return response.sendStatus(200);

    } catch (e) {
        return response.status(500).send(e)
    }
}

const validatePostParams = function() {
    // const requiredParams = ['nome', 'validade', 'localEntrega', 'itens'];

    // const checkParamPresent = function(body, paramName) {
    //     return (body[paramName]);
    // }

    return function (request, response, next) {
        // const body = (request.body);

        // for (let param of requiredParams) {
        //     if (!checkParamPresent(body, param)) {
        //         return response
        //             .status(422)
        //             .send({ message: `Missing param ${param}.` });
        //     }
        // }

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