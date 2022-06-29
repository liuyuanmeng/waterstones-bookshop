import Book from '../models/books.js'
// import User from '../models/users.js'
// import { Review } from '../models/review.js'

// METHOD: POST
// Endpoint: /books/:id/reviews
// Description: Add a review to a book, runs after secure route

export const addReview = async (req, res) => {
  const { id } = req.params

  try {
    const bookToUpdate = await Book.findById(id)
    if (!bookToUpdate) throw new Error('Book not found')
    // Create a review with an owner
    const reviewWithOwner = { ...req.body, owner: req.verifiedUser._id, firstname: req.verifiedUser.firstname }

    //check reviewowner username matches username of commenter
    // const checkUser = await User.findById(req.verifiedUser._id)
    // if (checkUser.firstname !== req.verifiedUser.firstname) throw new Error('Username does not match!')

    // Add the review to the database
    // await Review.create(reviewWithOwner)

    // Add reviewWithOwner into bookToUpdate.reviews
    bookToUpdate.reviews.push(reviewWithOwner)
    //  Save updated Book
    await bookToUpdate.save()
    // Send new document back to user
    return res.status(200).json(reviewWithOwner)
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
}
// METHOD: DELETE
// Endpoint: /delete/:id/reviews/:reviewId
// Description: Deleting a single comment, runs after secure route
export const deleteReview = async (req, res) => {

  const { id, reviewId } = req.params

  try {
    // Retrieve the specified book from the database, if it doesn't exist throw an error
    const book = await Book.findById(id)

    if (!book) throw new Error('Book not found')
    // get review to delete
    const reviewToDelete = book.reviews.id(reviewId)
    if (!reviewToDelete) throw new Error('Review not found')

    if (!reviewToDelete.owner.equals(req.verifiedUser._id)) throw new Error('Unauthorised')
    // Firstly we'll remove the subdocument from the reviews array
    await reviewToDelete.remove()

    // Secondly we'll save our document

    await book.save()
    // Return 204 status to user
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorised' })
  }
}

