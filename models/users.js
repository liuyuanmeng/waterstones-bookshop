import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseUniqueValidator from 'mongoose-unique-validator'

// Creating the User Schema
const userSchema = new mongoose.Schema({
  title: { type: String, enum: ['Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof', 'Rev', 'Mx'], required: true },
  firstName: { type: String, required: true, maxlength: 30 },
  lastName: { type: String, required: true, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  confirmEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: [],
}, { id: false })
// Adding in created reviews as a virtual field
userSchema
  .virtual('myReviews', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'reviews.owner',
    // get: function (books) {
    //   if (books)
    //     return books.map(book => {
    //       return {
    //         bookTitle: book.title,
    //         bookImage: book.image,
    //         reviews: book.reviews.filter(review => review.owner.equals(this._id)),
    //       }
    //     })
    // },
  })

// Setting passwordConfirmation as a virtual field to be used once for validation but not saved
userSchema
  .virtual('passwordConfirmation')
  .set(function (value) {
    this._passwordConfirmation = value
  })
// Removing the password from the json object when sending back to the user
userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json) {
    console.log('json --->', json)
    delete json.password
    return json
  },
})
// Checking the password matches the passwordConfirmation virtual field

userSchema
  .pre('validate', function (next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'haven\'t matched password field, try again')
    }
    next()
  })
// // Making sure the email address provided is a real email address
// userSchema
//   .pre('validate', function (next) {
//     if (this.isModified('email') && (this.email.indexOf('@') === -1 || this.email.indexOf('.') === -1)) {
//       this.invalidate('email', 'does not contain an email')
//     }
//     next()
//   })

// Before we save the new validated data to the database, we want to hash the password
userSchema
  .pre('save', function (next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12))
    }
    next()
  })

userSchema.methods.validatePassword = function (plainPassword) {
  return bcrypt.compareSync(plainPassword, this.password)
}

userSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('User', userSchema)