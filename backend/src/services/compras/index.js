const modelExample = { 
    id: 1, 
    nome: "João",
    validade: 1587853511000,
    localCompra: "Supermercado Pague Menos",
    localEntrega: "Rua XV de Novembro, 400 - Indaiatuba - SP",
    itens: ["2 sacos de arroz 5kg", "5 maçãs", "3 abacaxis"],
    observaoes: "Posso fazer o pick-up no seu porta-malas"
}

const listCompras = () => [modelExample]

const getCompra = (request, response) => {

    const compraId = request.params.id;

    if (!compraId) {
        return listCompras();
    }

    // get dados do banco

    
    console.log('compraId', compraId)

    const compra = listCompras().filter(item => item.id === compraId)

    if (!compra) {
        console.error('compra not found')
    }

    return compra;
}

module.exports = {
    listCompras,
    getCompra
}