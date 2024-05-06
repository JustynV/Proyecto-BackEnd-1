const { createBookMongo, getBookMongo,deleteBookMongo,updateBookMongo,getUniqueBookMongo } = require("./book.actions");

async function getFilteredBooks(query) {
    
    // hacer llamado a base de datos con el filtro de tipo
    const resultadosBusqueda = await getBookMongo(query);

    return resultadosBusqueda;
}

async function getBookById(id) {

    // hacer llamado a base de datos con el filtro de tipo
    const bookFound = await getUniqueBookMongo(id);
    
    return bookFound;
}

async function createBook(datos, id) {

    // hacer llamado a base de datos con el filtro de tipo
    datos["author_id"] = id
    const createdBook = await createBookMongo(datos);

    return createdBook;
}


function updateBook(datos) {
    const { _id, ...cambios } = datos;

    // hacer llamado a base de datos con el filtro de tipo
    const updatedBook = updateBookMongo(_id, cambios);

    return updatedBook;
}

function deleteBook(id) {

    // hacer llamado a base de datos con el filtro de tipo
    const deletedBook = deleteBookMongo(id);

    return deletedBook;
}

module.exports = {
    getFilteredBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}