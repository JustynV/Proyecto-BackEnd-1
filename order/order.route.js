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
const bookController = require("../book/book.controller.js")

async function getOrders(req, res) {
  try {
    token = AuthController.cookiesJWT(req, res);
    if (token !== "Invalid") {
      const resultadosBusqueda = await getFilteredOrders(req.query, token._id);
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

async function GetOrderById(req, res) {
  try {
    token = AuthController.cookiesJWT(req, res);
    if (token !== "Invalid") {
      const resultadoBusqueda = await getOrderById(req.params.id, token._id);
      res.status(200).json({
        order: resultadoBusqueda
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

async function PostOrder(req, res) {
  try {
    token = AuthController.cookiesJWT(req, res);
    if (token !== "Invalid") {
      books = req.body.items
      try {
        author = bookController.getBookById(books[0]).author_id
        for (i = 1; i < books.lenght(); i++) {
          if (bookController.getBookById(books[i]).author_id != author) {
            res.status(500).json({
              error: "Libro de diferente autor",
            });
          }
        }
      } catch (error) {
        res.status(500).json({
          error: "Libro Inexistente",
        });
      }

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
    orderToChange = await getOrderById(req.params.id);
    if (
      token !== "Invalid" &&
      orderToChange !== undefined
    ) {
      if (token._id === orderToChange.buyer_id) {
        if (req.params.status !== "Cancelado") {
          updateOrder(req.params.id, req.params.status);
        } else {
          res.status(500).json({
            error: "Estado no válido",
          });
        }
      } else if (token._id === orderToChange.seller_id) {
        if (req.params.status !== "Cancelado" || req.params.status !== "Completado") {
          updateOrder(req.params.id, req.params.status);
        } else {
          res.status(500).json({
            error: "Estado no válido",
          });
        }
      }
      else {
        res.status(500).json({
          mensaje: "Usuario no autorizado",
        });
      }
      res.status(200).json({
        mensaje: "Exito. 👍",
      });
    }
    else {
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
router.get("/:id", GetOrderById);
router.post("/", PostOrder);
router.patch("/:id/:status", PatchOrder);

module.exports = router;