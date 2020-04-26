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
    compras.push(newCompra)
}

module.exports = {
    listCompras,
    getCompra,
    addCompra
}