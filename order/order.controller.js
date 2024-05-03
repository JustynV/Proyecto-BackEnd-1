const { createOrderMongo, getOrderMongo,deleteOrderMongo,updateOrderMongo, getOrderByIdMongo} = require("./order.actions");

async function getFilteredOrders(query) {
    
    // hacer llamado a base de datos con el filtro de tipo
    const resultadosBusqueda = await getOrderMongo(query);

    return resultadosBusqueda;
}

async function getOrderById(id) {
    
    // hacer llamado a base de datos con el filtro de tipo
    const order = await getOrderByIdMongo(id);

    return order;
}

async function createOrder(datos, id) {

    // hacer llamado a base de datos con el filtro de tipo
    datos["creator_id"] = id
    const productoCreado = await createOrderMongo(datos);

    return productoCreado;
}


function updateOrder(id, status) {

    // hacer llamado a base de datos con el filtro de tipo
    const updateOrder = updateOrderMongo(id, status);

    return updateOrder;
}

function deleteOrder(id) {

    // hacer llamado a base de datos con el filtro de tipo
    const productoCreado = deleteOrderMongo(id);

    return productoCreado;
}

module.exports = {
    getFilteredOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}