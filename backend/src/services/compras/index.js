const { Compra } = require("../../model/compra.js");
const { User } = require("../../model/user");
const uuid = require("uuid");

const status = {
  NEW: "NEW",
  ASSIGNED: "ASSIGNED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
};

const compras = [
  Compra.createFromJson({
    id: 1,
    nome: "João",
    validade: 1587853511000,
    localCompra: "Supermercado Pague Menos",
    localEntrega: "Rua XV de Novembro, 400 - Indaiatuba - SP",
    status: status.NEW,
    itens: ["2 sacos de arroz 5kg", "5 maçãs", "3 abacaxis"],
    observaoes: "Posso fazer o pick-up no seu porta-malas",
  }),
];

const listCompras = async () => {
  const compras = new Compra();
  compras.setCompraModel();
  const users = new User();
  users.setUserModel();
  try {
    const list = await compras.list();
    const userList = await users.list();
    const parsedUserList = userList.map((i) => ({
      id: i.id,
      name: i.name,
      email: i.email,
    }));
    const fullList = list.map((i) => ({
      id: i.id,
      creator: parsedUserList.find((e) => e.id === i.creatorId),
      products: i.products.split(">"), //Gambiarra daquelas de dar orgulho
      status: i.status,
      expiryDate: i.expiryDate,
      assignee: parsedUserList.find((e) => e.id === i.assigneeId),
      notes: i.notes,
      deliveryAddress: i.deliveryAddress,
      buyAddress: i.buyAddress,
      createdAt: i.createdAt,
    }));
    return fullList;
  } catch (e) {
    console.error(e);
    return [];
  }
};

// TODO: findById from DB
function getCompraById(compraId) {
  return listCompras().find((c) => c.id == compraId);
}

const addCompra = async (incomingBody) => {
  // TODO: insert on DB
  const newId = uuid.v4();
  const newCompra = new Compra(newId);
  newCompra.setCompraModel();
  newCompra.create({
    ...incomingBody,
    products: incomingBody.products.join(">"),
  });
  const users = new User();
  users.setUserModel();
  const userList = await users.list();
  const parsedUserList = userList.map((i) => ({
    id: i.id,
    name: i.name,
    email: i.email,
  }));

  return {
    ...incomingBody,
    creator: parsedUserList.find((i) => i.id === incomingBody.creatorId),
    status: "NEW",
    id: newId,
  };
};

const updateCompra = (compraId, compraUpdate) => {
  const compra = getCompraById(compraId);
  if (!compra) {
    return;
  }

  const updatedCompra = compra.update(compraUpdate);

  return updatedCompra;
};

const assignCompra = async (compraId, assigneeId) => {
  const compras = new Compra();
  compras.setCompraModel();

  await compras.update({
    status: status.ASSIGNED,
    assigneeId,
  }, {
    where: {
      id: compraId,
    }
  })
  return;
  // compra.status = status.ASSIGNED;
  // compra.assigneeId = assigneeId;
  // console.log('Got this guy!', compra);
  // await compra.save();
  // // TODO: update on DB

  // return compra;
};

const deliverCompra = async (compraId) => {
  const compras = new Compra();
  compras.setCompraModel();

  await compras.update({
    status: status.DELIVERED,
  }, {
    where: {
      id: compraId,
    }
  })
  return;
};

const cancelCompra = async (compraId) => {
  const compras = new Compra();
  compras.setCompraModel();
  console.log('Cancelling this guy', compraId)
  await compras.update({
    status: status.CANCELLED,
  }, {
    where: {
      id: compraId,
    }
  });
  console.log('Deu boa?');
  return;
};

module.exports = {
  listCompras,
  getCompraById,
  addCompra,
  updateCompra,
  assignCompra,
  deliverCompra,
  cancelCompra,
};
