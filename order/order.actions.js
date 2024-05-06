const Order = require("./order.model");

async function getOrderMongo(filtros,id) {
  if (!filtros.hasOwnProperty("deleted")) {
    filtros["deleted"] = false
  }
  filtros["buyer_id"] = id
  console.log(filtros)
  const OrderFiltered = await Order.find(filtros, {deleted: 0, createdAt:0, updatedAt:0, buyer_id:0, seller_id:0});

  return {
    resultados: OrderFiltered,
  };
}

async function getOrderByIdMongo(id) {
  const order = Order.findById(id)
  return order
}

async function createOrderMongo(datos) {
  const createdOrder = await Order.create(datos);

  return createdOrder;
}

async function updateOrderMongo(id, status) {
  await Order.findByIdAndUpdate({ _id: id }, { state: status, deleted: true })
    .then((resultado) => {
      return resultado;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

async function deleteOrderMongo(id) {
  const resultado = await Order.findByIdAndUpdate(id, {deleted:true});

  return resultado;
}

module.exports = {
  createOrderMongo,
  getOrderMongo,
  getOrderByIdMongo,
  updateOrderMongo,
  deleteOrderMongo,
};
