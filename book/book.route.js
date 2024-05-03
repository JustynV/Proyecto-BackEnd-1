const express = require("express");
const router = express.Router();
const {
  getFilteredBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("./book.controller");

const AuthController = require("../Auth/AuthController.js");

async function GetBooks(req, res) {
  try {
    // llamada a controlador con los filtros

    const resultadosBusqueda = await getFilteredBooks(req.query);

    res.status(200).json({
      ...resultadosBusqueda,
    });
  } catch (e) {
    res.status(500).json({ msg: "" });
  }
}

async function GetBook(id) {
    // llamada a controlador con los filtros

    const resultadosBusqueda = await getBookById(id);

    return resultadosBusqueda
}

async function PostBook(req, res) {
  try {
    token = AuthController.cookiesJWT(req, res)
    if (token !== "Invalid") {
      await createBook(req.body, token._id);
      res.status(200).json({
        mensaje: "Creado con exito. 👍",
      });
    }else{
      res.status(500).json({
        error: "Token Invalido"
      })
    }
  } catch (e) {
    res.status(500).json({
      error: e
    })
  }
}

async function PatchBook(req, res) {
  try {
    // llamada a controlador con los datos
    token = AuthController.cookiesJWT(req, res)
    book = GetBook(req.body._id)
    if (token !== "Invalid" && book.author_id !== token._id) {
      res.status(500).json({
        mensaje: "Token invalido",
      });
    } else {
      await updateBook(req.body);
      res.status(200).json({
        mensaje: "Actualizado con exito. 👍",
      });
    }

  } catch (e) {
    res.status(500).json({
      error: e
    })  }
}

async function DeleteBook(req, res) {
  try {
    // llamada a controlador con los datos
    token = AuthController.cookiesJWT(req, res)
    book = await getBookById(req.params.id)

    if (token !== "Invalid" && book.author_id !== token._id) {
      res.status(500).json({
        mensaje: "Token invalido",
      });
    } else {
      await deleteBook(req.params.id);
      res.status(200).json({
        mensaje: "Eliminado con exito. 👍",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e
    })  }
}

router.get("/", GetBooks);
router.post("/", PostBook);
router.patch("/", PatchBook);
router.delete("/:id", DeleteBook);

module.exports = router;
