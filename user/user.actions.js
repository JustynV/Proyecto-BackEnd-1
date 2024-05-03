const User = require("./user.model.js");
const jwt = require("jsonwebtoken");
const secretKey = "secretsauce";

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
    const token = jwt.sign(payload, secretKey, { expiresIn: "3 days" });
    return token;
  } catch (error) {
    console.log(error);
  }
}
async function updateUserMongo(update, user) {
  updatedUser = User.update(update);

  return updatedUser;
}
async function deleteUserMongo(id) {
  deletedUser = User.deleteOne(id);

  return deletedUser;
}

module.exports = {
  getUserMongo,
  updateUserMongo,
  createUserMongo,
  loginUserMongo,
  deleteUserMongo,
};
