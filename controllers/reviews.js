import Review from '../models/reviews.js'
import Book from '../models/books.js'

// Get the reviews the user made
export const getReviews = async (req, res) => {

  try {
  
    const ownedReviews = await Review.find( { owner: req.verifiedUser._id } )
    console.log('request new --->', req)
    if (!ownedReviews) throw new Error('User not found')
    
    return res.status(200).json(ownedReviews)
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorised' })
  }
}

export const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params

  try {
  
    const reviewToDelete = await Review.findById(reviewId)
    const book = await Book.findOne(id)
    const reviewToDeleteFromBook = book.reviews.id(reviewId)
    console.log('book --->,', book)
    if (!reviewToDelete) throw new Error('Review not found')
    
    await reviewToDelete.remove()
    await reviewToDeleteFromBook.remove()

    await book.save()
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorised' })
  }
}