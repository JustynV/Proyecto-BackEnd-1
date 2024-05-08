const User = require("./user.model.js");
const AuthController = require("../Auth/AuthController.js")
const argon2 = require('argon2');

async function getUserMongo(filtros) {
  if (!filtros.hasOwnProperty("deleted")) {
    filtros["deleted"] = false
  }
  const user = await User.findOne(filtros);
  return {
    User: user,
  };
}

async function getUserByIdMongo(id) {
  const userFound = await User.findById(id)
  return userFound
}

async function createUserMongo(datos) {
  hashed = await argon2.hash(datos.password)
  datos_hash = {
    name: datos.name,
    email: datos.email,
    password:hashed
  }
  const user = await User.create(datos_hash);
  return {
    user,
  };
}

async function loginUserMongo(datos) {
  const { name, email, password } = datos;
  const user = await User.findOne({ email: email });
  if (!await argon2.verify(user.password, password)) {
    return res.status(500);
  }
  payload = { _id: user.id };
  try {
    return AuthController.generateToken(payload)
  } catch (error) {
    console.log(error);
  }
}
async function updateUserMongo(id, update) {
  updatedUser = User.findByIdAndUpdate(id ,update);
  return updatedUser;
}
async function deleteUserMongo(id) {
  deletedUser = User.findByIdAndUpdate(id, {deleted: true});

  return deletedUser;
}

module.exports = {
  getUserMongo,
  getUserByIdMongo,
  updateUserMongo,
  createUserMongo,
  loginUserMongo,
  deleteUserMongo,
};
