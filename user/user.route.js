const express = require("express");
const router = express.Router();
const {
  getUser,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  loginUser,
} = require("./user.controller");
const AuthController = require("../Auth/AuthController.js");

async function GetUser(req, res) {
  try {
    // llamada a controlador con los filtros
    token = AuthController.cookiesJWT(req, res);
    if (token !== "Invalid") {
      const resultadosBusqueda = await getUser(req.query);
      res.status(200).json({
        ...resultadosBusqueda,
      });
    } else {
      res.status(500).json({
        error: "Token invalido",
      });
    }
  } catch (e) {
    res.status(500).json({ msg: "No se encontraron datos" });
  }
}

async function CreateUser(req, res) {
  try {
    // llamada a controlador con los filtros
    const user = await createUser(req.body);
    const cookie = await loginUser(req.body);
    res.cookie("token", cookie, { httpOnly: true });
    res.status(200).json({
      user,
    });
  } catch (e) {
    res.status(500).json({ msg: "No se pudo crear el user" });
  }
}

async function LoginUser(req, res) {
  try {
    // llamada a controlador con los filtros
    const cookie = await loginUser(req.body);
    res.cookie("token", cookie, { httpOnly: true });
    res.status(200).json({ token: cookie });
  } catch (e) {
    res.status(500).json({ msg: "No se pudo hacer login al user" });
  }
}

async function PatchUser(req, res) {
  try {
    // llamada a controlador con los datos
    token = AuthController.cookiesJWT(req, res);
    user = findUserById(req._id);
    if (user !== undefined && token._id === user.id) {
      updateUser(req.body);

      res.status(200).json({
        mensaje: "Exito. 👍",
      });
    } else {
      res.status(500).json({
        mensaje: "Token o id Invalida",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}

async function DeleteUser(req, res) {
  try {
    // llamada a controlador con los datos
    deleteUser(req.params.id);

    res.status(200).json({
      mensaje: "Exito. 👍",
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}

router.get("/", GetUser);
router.patch("/", PatchUser);
router.delete("/:id", DeleteUser);
router.post("/", CreateUser);
router.post("/login", LoginUser);

module.exports = router;
