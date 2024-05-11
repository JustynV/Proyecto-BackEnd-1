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
        author = req.body.seller_id
        for (i = 0; i < books.length; i++) {
          book = await bookController.getBookById(books[i])
          if (book.author_id != author) {
            throw new Error("Libros de otro autor");
          }
        }
    } else {
      throw new Error("Token invalida");
    }
    await createOrder(req.body, token._id)
    res.status(202).json({
      msg: "Orden creada exitosamente"
    })
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
}

async function PatchOrder(req, res) {
  try {
    token = AuthController.cookiesJWT(req, res);
    orderToChange = await getOrderById(req.body._id);
    const {state} = req.body;
    if (
      token !== "Invalid" &&
      orderToChange !== undefined
    ) {
      if (token._id === orderToChange.buyer_id) {
        if (state === "Cancelado") {
          updateOrder(req.body._id, state);
        } else {
          throw new Error("Estado no válido para comprador")
        }
      } else if (token._id === orderToChange.seller_id) {
        if (state === "Cancelado" || state === "Completado") {
          updateOrder(req.body._id, state);
          if(state === "Completado"){
            books = orderToChange.items
            for(i = 0;i<books.length;i++){
              bookController.updateBook({_id: books[i],deleted: true})
            }
          }
        } else {
          throw new Error("Estado no válido para vendedor")
        }
      }
      else {
        throw new Error("Usuario no válido")
      }
      res.status(200).json({
        mensaje: "Exito. 👍",
      });
    }
    else {
      throw new Error("Token o ID de pedido Invalida")
    }
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
}

router.get("/", getOrders);
router.get("/:id", GetOrderById);
router.post("/", PostOrder);
router.patch("/", PatchOrder);

module.exports = router;