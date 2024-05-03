const Book = require("./book.model");

async function getBookMongo(filtros) {
  const bookFiltered = await Book.find(filtros);

  return {
    resultados: bookFiltered,
  };
}

async function getUniqueBookMongo(id) {
  const bookFound = await Book.findById(id);
  return bookFound
}

async function createBookMongo(datos) {
    const createdBook = await Book.create(datos);
    return createdBook;
}

async function updateBookMongo(id, cambios) {
        const resultado = await Book.findByIdAndUpdate(id, cambios);
        return resultado;
}

async function deleteBookMongo(id) {
    
  const resultado = await Book.findByIdAndDelete(id);

  return resultado;
}

module.exports = {
  createBookMongo,
  getUniqueBookMongo,
  getBookMongo,
  updateBookMongo,
  deleteBookMongo,
};
