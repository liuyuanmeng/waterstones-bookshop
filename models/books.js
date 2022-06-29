import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { reviewSchema } from './review.js'


const bookSchema = new mongoose.Schema({
  genre: { type: String, required: true },
  subGenre: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  authors: { type: String },
  yearPublished: { type: String, required: true },
  price: { type: Number, required: true },
  reviews: [reviewSchema],
})
bookSchema
  .virtual('avgRating')
  .get(function(){
    if (!this.reviews.length) return 'Not Rated Yet'
    const sum = this.reviews.reduce((acc, review) => {
      return acc + review.rating
    }, 0)
    return (sum / this.reviews.length).toFixed(2)
  })
bookSchema.set('toJSON', {
  virtuals: true,
})

bookSchema.plugin(mongooseUniqueValidator)





export default mongoose.model('Book', bookSchema)