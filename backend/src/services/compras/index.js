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
    const compra = listCompras().filter(item => item.id == compraId)

    if (Object.keys(compra).length === 0) {
        console.error('Compra not found')
    }

    return compra;
}

const addCompra = (request, response) => {
    const body = request.body;
    console.log('body', body);

    // TODO: insert on DB
    compras.push(body)
}

module.exports = {
    listCompras,
    getCompra,
    addCompra
}