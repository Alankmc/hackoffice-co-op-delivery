const { Compra } = require('../../model/compra.js');
const uuid = require('uuid');

const status = {
    NEW: 'NEW',
    ASSIGNED: 'ASSIGNED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED'
}

const compras = [
    Compra.createFromJson(
        { 
            id: 1, 
            nome: "João",
            validade: 1587853511000, 
            localCompra: "Supermercado Pague Menos", 
            localEntrega: "Rua XV de Novembro, 400 - Indaiatuba - SP",
            status: status.NEW,
            itens: ["2 sacos de arroz 5kg", "5 maçãs", "3 abacaxis"],
            observaoes: "Posso fazer o pick-up no seu porta-malas"
        })
]

const listCompras = () => compras

// TODO: findById from DB
function getCompraById(compraId) {
    return listCompras().find(c => c.id == compraId);
}

const addCompra = (newCompra) => {
    const newCompra = {...request.body, id: uuid.v4(), status: status.NEW};
    // TODO: insert on DB
    compras.push(newCompra);
}

const updateCompra = (compraId, compraUpdate) => {
    const compra = getCompraById(compraId);
    if (!compra) {
        return;
    }

    const updatedCompra = compra.update(compraUpdate);

    return updatedCompra;
}

const assignCompra = (compraId) => {
    let compra = getCompraById(compraId);

    if (!compra || compra.status != status.NEW) {
        return;
    }

    const assigneeId = 'XPTO'; // TODO: Define how to get userId here.
    compra.status = status.ASSIGNED;
    compra.assigneeId = assigneeId;

    // TODO: update on DB

    return compra;
}

const deliverCompra = (compraId) => {
    let compra = getCompraById(compraId);

    if (!compra || compra.status != status.ASSIGNED) {
        return;
    }

    compra.status = status.DELIVERED;

    // TODO: update on DB

    return compra;
}

const cancelCompra = (compraId) => {
    let compra = getCompraById(compraId);

    if (!compra || compra.status == status.DELIVERED) {
        return;
    }

    compra.status = status.CANCELLED;

    // TODO: update on DB

    return compra;
}

module.exports = {
    listCompras,
    getCompraById,
    addCompra,
    updateCompra,
    assignCompra,
    deliverCompra,
    cancelCompra
}