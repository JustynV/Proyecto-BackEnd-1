const User = require("./user.model.js");
const AuthController = require("../Auth/AuthController.js")

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
  const user = await User.create(datos);
  return {
    user,
  };
}

async function loginUserMongo(datos) {
  const { name, email, password } = datos;
  const user = await User.findOne({ email: email });

  if (user.password !== password) {
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
