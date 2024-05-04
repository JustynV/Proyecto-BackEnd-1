const User = require("./user.model.js");
const AuthController = require("../Auth/AuthController.js")

async function getUserMongo(filter) {
  const user = await User.findOne(filter);
  return {
    User: user,
  };
}

async function getUserByIdMongo(id) {
  await User.findById(id)
    .then((user) => {
      return user;
    })
    .catch((err)=>{
      return undefined
    });
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
async function updateUserMongo(update, user) {
  updatedUser = User.update(update);

  return updatedUser;
}
async function deleteUserMongo(id) {
  deletedUser = User.findByIdAndUpdate(id, {deleted: true});

  return deletedUser;
}

module.exports = {
  getUserMongo,
  updateUserMongo,
  createUserMongo,
  loginUserMongo,
  deleteUserMongo,
};
