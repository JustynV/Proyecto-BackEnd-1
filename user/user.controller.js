const { createUserMongo, getUserMongo,deleteUserMongo,updateUserMongo, loginUserMongo, getUserByIdMongo } = require("./user.actions");

async function getUser(query) {
    const resultadosBusqueda = await getUserMongo(query);

    return resultadosBusqueda;
}

async function findUserById(id) {

    const user = await getUserByIdMongo(id);

    return user;
}

async function loginUser(datos) {
    const cookie = await loginUserMongo(datos);
    return cookie;
}

async function createUser(datos) {

    const createdUser = await createUserMongo(datos);

    return createdUser;
}


function updateUser(datos) {
    const { _id, ...cambios } = datos;

    // hacer llamado a base de datos con el filtro de tipo
    const updatedUser = updateUserMongo(_id, cambios);

    return updatedUser;
}

function deleteUser(id) {

    // hacer llamado a base de datos con el filtro de tipo
    const productoCreado = deleteUserMongo(id);

    return productoCreado;
}

module.exports = {
    getUser,
    findUserById,
    createUser,
    updateUser,
    loginUser,
    deleteUser
}