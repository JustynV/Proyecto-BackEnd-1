const express = require("express");
const router = express.Router();
const {
  getFilteredOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("./order.controller");
const AuthController = require("../Auth/AuthController.js");

async function getOrders(req, res) {
  try {
    // llamada a controlador con los filtros
    token = AuthController.cookiesJWT(req, res);
    if (token !== "Invalid") {
      const resultadosBusqueda = await getFilteredOrders(req.query);
      res.status(200).json({
        ...resultadosBusqueda,
      });
    } else {
      res.status(500).json({
        error: "Token Invalida",
      });
    }
  } catch (e) {
    res.status(500).json({ msg: "" });
  }
}

async function getOrder(id) {
  return await getOrderById(id);
}

async function PostOrder(req, res) {
  try {
    token = AuthController.cookiesJWT(req, res);
    if (token !== "Invalid") {
      await createOrder(req.body, token._id);
    } else {
      res.status(500).json({
        error: "Token Invalida",
      });
    }
    res.status(200).json({
      mensaje: "Exito. 👍",
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}

async function PatchOrder(req, res) {
  try {
    token = AuthController.cookiesJWT(req, res);
    orderToChange = await getOrder(req.params.id);
    if (
      token !== "Invalid" &&
      orderToChange != undefined &&
      token._id !== orderToChange.creator_id
    ) {
      if (
        req.params.status !== "Cancelado" ||
        req.params.status !== "Completado"
      ) {
        updateOrder(req.params.id, req.params.status);
      }else{
        res.status(500).json({
          mensaje: "Error de estado",
        });
      }
      res.status(200).json({
        mensaje: "Exito. 👍",
      });
    } else {
      res.status(500).json({
        error: "Token o ID de pedido Invalida",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}

router.get("/", getOrders);
router.post("/", PostOrder);
router.patch("/:id/:status", PatchOrder);

module.exports = router;
