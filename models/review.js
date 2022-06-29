import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'


export const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 30 },
  text: { type: String, required: true, maxlength: 350 },

  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true ,
  id: false,
})
reviewSchema.set('toJSON', {
  virtuals: true,
})

reviewSchema.plugin(mongooseUniqueValidator)
export const Review = mongoose.model('Review', reviewSchema )