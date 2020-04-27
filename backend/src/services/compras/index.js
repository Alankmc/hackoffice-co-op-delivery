const { Compra } = require('../../model/compra.js');

const compras = [{ 
    id: 1, 
    nome: "João",
    validade: 1587853511000,
    localCompra: "Supermercado Pague Menos",
    localEntrega: "Rua XV de Novembro, 400 - Indaiatuba - SP",
    itens: ["2 sacos de arroz 5kg", "5 maçãs", "3 abacaxis"],
    observaoes: "Posso fazer o pick-up no seu porta-malas"
}]

const listCompras = () => compras

const getCompra = (request, response) => {
    const compraId = request.params.id;

    if (!compraId) {
        return listCompras();
    }

    // TODO: findById from DB
    const compra = listCompras().find(c => c.id == compraId)

    if (!compra) {
        response.statusCode = 404;
        response.json({message: 'Compra not found'});
    }

    return compra;
}

const addCompra = (request, response) => {
    const newCompra = request.body;
    console.log('body', newCompra);

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

    // TODO: findById from DB
    const existentCompra = listCompras().find(c => c.id == compraId)
    if (!existentCompra) {
        return response
            .status(404)
            .send({ message: `Compra ${compraId} not found.` });
    }

    const updatedCompra = request.body;
    console.log('updatedCompra', updatedCompra);

    for (let property in updatedCompra) {
        existentCompra[property] = updatedCompra[property];
    }

    // TODO: update on DB
    // compras.push(existentCompra);

    return response.status(200).json(updatedCompra);
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
    console.log(body)
    console.log(paramName)
    return (body[paramName]);
};

module.exports = {
    listCompras,
    getCompra,
    addCompra,
    updateCompra,
    validatePostParams
}