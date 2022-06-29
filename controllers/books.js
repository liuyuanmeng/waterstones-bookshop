import Book from '../models/books.js'

// METHOD: GET
// Endpoint: /books
// Descrition - requests all books in database
export const showBooks = async (req, res) => {
  const books = await Book.find()
  console.log('get books')
  return res.status(200).json(books)
}

// METHOD: GET
// Endpoint: /books/:id
// description - requests a single book by ID from database
export const showSingleBook = async (req, res) => {
  const { id } = req.params
  try {
    const book = await Book.findById(id)
      .populate('reviews.owner')
    if (!book) {
      return res.status(404).json({ message: 'Book not found, try another ID' })
    }
    console.log('single book -> ', book)
    return res.status(200).json(book)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Can\'t retrieve book...' })
  }
}