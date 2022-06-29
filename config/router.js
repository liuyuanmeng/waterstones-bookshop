import express from 'express'
import { showBooks, showSingleBook } from '../controllers/books.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { addReview, deleteReview } from '../controllers/booksReviews.js'
import { secureRoute } from './secureRoute.js'
import { getProfile, updateProfile } from '../controllers/users.js'
import { addItemToWishlist } from '../controllers/users.js'
import { getWishlist } from '../controllers/users.js'
// import { getReviews, deleteReview } from '../controllers/reviews.js'

const router = express.Router()

// Get all book
router.route('/books')
  .get(showBooks)

// Get single book
router.route('/books/:id')
  .get(showSingleBook)
// Users
router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)
//Reviews
router.route('/books/:id/reviews')
  .post(secureRoute, addReview)

router.route('/books/:id/reviews/:reviewId')
  .delete(secureRoute, deleteReview)
//Account
router.route('/account')
  .get(secureRoute, getProfile)

router.route('/account/profile')
  .put(secureRoute, updateProfile)

// router.route('/account/reviews')
//   .get(secureRoute, getReviews)

// router.route('/account/reviews/:reviewId')
//   .delete(secureRoute, deleteReview)



// add item to wishlist
router.route('/account/wishlist/:bookId')
  .post(secureRoute, addItemToWishlist)

// get wishlist
router.route('/account/wishlist')
  .get(secureRoute, getWishlist)


export default router