const Order = require("./order.model");

async function getOrderMongo(filtros) {
  const OrderFiltered = await Order.find(filtros);

  return {
    resultados: OrderFiltered,
  };
}

async function getOrderByIdMongo(id) {
  await Order.findById(id)
    .then((order) => {
      return order;
    })
    .catch((error) => {
        return undefined
    });
}

async function createOrderMongo(datos) {
  const createdOrder = await Order.create(datos);

  return createdOrder;
}

async function updateOrderMongo(id, status) {
  await Order.findByIdAndUpdate({ _id: id }, { state: status })
    .then((resultado) => {
      return resultado;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

async function deleteOrderMongo(id) {
  const resultado = await Order.findByIdAndDelete(id);

  return resultado;
}

module.exports = {
  createOrderMongo,
  getOrderMongo,
  getOrderByIdMongo,
  updateOrderMongo,
  deleteOrderMongo,
};
