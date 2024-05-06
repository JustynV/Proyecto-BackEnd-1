const { createBookMongo, getBookMongo,deleteBookMongo,updateBookMongo,getUniqueBookMongo } = require("./book.actions");

async function getFilteredBooks(query) {
    
    const resultadosBusqueda = await getBookMongo(query);

    return resultadosBusqueda;
}

async function getBookById(id) {

    const bookFound = await getUniqueBookMongo(id);
    
    return bookFound;
}

async function createBook(datos, id) {

    datos["author_id"] = id
    const createdBook = await createBookMongo(datos);

    return createdBook;
}


function updateBook(datos) {
    const { _id, ...cambios } = datos;

    const updatedBook = updateBookMongo(_id, cambios);

    return updatedBook;
}

function deleteBook(id) {

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