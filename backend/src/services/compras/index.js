const { Compra } = require('../../model/compra.js');
const { getLoggedUser } = require("../users");

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
            requestorId: "1",
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
    newCompra.status = status.NEW;
    newCompra.requestorId = getLoggedUser().id;

    // TODO: insert on DB
    compras.push(newCompra);
}

const updateCompra = (compraId, compraUpdate) => {
    const compra = getCompraById(compraId);
    if (!compra) {
        return 404;
    } else if (compra.requestorId !== getLoggedUser().id) {
      return 403;
    }

    const updatedCompra = compra.update(compraUpdate);

    // TODO: update on DB

    return updatedCompra;
}

const assignCompra = (compraId) => {
    let compra = getCompraById(compraId);

    if (!compra) {
      return 404;
    } else if (compra.status !== status.NEW || compra.requestorId === getLoggedUser().id) {
      // You can't assign a compra that's not new, or assign to the same user who created it.
      return 409;
    }

    const assigneeId = getLoggedUser().id;
    compra.status = status.ASSIGNED;
    compra.assigneeId = assigneeId;

    // TODO: update on DB

    return compra;
}

const unassignCompra = (compraId) => {
  let compra = getCompraById(compraId);

  if (!compra) {
    return 404;
  } else if (compra.status !== status.ASSIGNED) {
    // You can't unassign a compra that's not assigned.
    return 409;
  } else if (compra.requestorId !== getLoggedUser().id && compra.assigneeId !== getLoggedUser().id) {
    // Only the requestor and the assignee can unassign the compra
    return 403;
  }

  compra.status = status.NEW;
  delete compra.assigneeId;

  // TODO: update on DB

  return compra;
}

const deliverCompra = (compraId) => {
    let compra = getCompraById(compraId);

    if (!compra) {
      return 404;
    } else if (compra.status !== status.ASSIGNED) {
      return 409;
    } else if (compra.requestorId !== getLoggedUser().id && compra.assigneeId !== getLoggedUser().id) {
      // Only the requestor and the assignee can flag as delivered
      return 403;
    }

    compra.status = status.DELIVERED;

    // TODO: update on DB

    return compra;
}

const cancelCompra = (compraId) => {
    let compra = getCompraById(compraId);

    if (!compra) {
      return 404;
    } else if (compra.status === status.DELIVERED) {
      return 409;
    } else if (compra.requestorId !== getLoggedUser().id) {
      return 403;
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
    unassignCompra,
    deliverCompra,
    cancelCompra
}
