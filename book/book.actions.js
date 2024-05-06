const Book = require("./book.model");

async function getBookMongo(filtros) {
  if (!filtros.hasOwnProperty("deleted")) {
    filtros["deleted"] = false
  }
  const bookFiltered = await Book.find(filtros, {deleted: 0, createdAt:0, updatedAt:0, author_id:0});

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
    
  const resultado = await Book.findByIdAndUpdate(id, {deleted: true});

  return resultado;
}

module.exports = {
  createBookMongo,
  getUniqueBookMongo,
  getBookMongo,
  updateBookMongo,
  deleteBookMongo,
};
