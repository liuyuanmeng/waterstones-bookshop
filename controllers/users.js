import User from '../models/users.js'
import Book from '../models/books.js'
// import jwt from 'jsonwebtoken' // jwt is going to provide methods to create a token

/// METHOD: GET
// Endpoint: account/profile/:userId
// Description: Return current user's profile by ID, runs after secure route
export const getProfile = async (req, res) => {
  console.log('getProfile')

  try {
    const account = await User.findById(req.verifiedUser._id).populate('myReviews')  

    if (!account) throw new Error('User not found')
    
    return res.status(200).json(account)
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorised' })
  }
}

export const updateProfile = async (req, res) => {
  const { body: editProfile, verifiedUser } = req

  try {
    
    const updatedProfile = await User.findById(verifiedUser._id)  
    console.log('updatedProfile', updatedProfile)
    // Update the document
    Object.assign(updatedProfile, editProfile)

    // Save the document
    await updatedProfile.save()

    console.log('updatedProfileAGAIN', updatedProfile)

    if (!updatedProfile){
      return res.status(404).json({
        message: 'User not found',
      })
    }
    return res.status(200).json(updatedProfile)
  } catch (err) {
    console.log('ERRRR ==>', err)
    return res.status(404).json(err)
  }
}


// export const showUsers = async (req, res) => {
//   const users = await User.find()
//   console.log('get users')
//   return res.status(200).json(users)
// }

// export const deleteUser = async (req, res) => {

//   const { id } = req.params
//   console.log(req.params)

//   try {
//     const user = await User.findById(id)

//     if (!user) throw new Error('Book not found')


//     await user.remove()

//     return res.sendStatus(204)
//   } catch (error) {
//     console.log(error)
//     return res.status(401).json({ message: 'Unauthorised' })
//   }
// }

// TODO add/delete Item to wishlist
// METHOD: POST
// Endpoint: /account/wishlist/
// description: this method contains logic to either add or delete an object from the wishlist
// dependant upon the item already being or not being in the wishlist.
export const addItemToWishlist = async (req, res) => {

  const { bookId } = req.params
  
  try {
    if (!req.verifiedUser || !req.verifiedUser._id) throw new Error('You\'re not logged in')
    const userAccount = await User.findById(req.verifiedUser._id) 

    const wishListItem = await Book.findById(bookId)
    if (!wishListItem) throw new Error('book not found')

    // both push and remove methods modelled from stackoverflow solution - link:
    // https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
    if (userAccount.wishlist.some(item => item.id === bookId)) {
      userAccount.wishlist.remove(bookId)
      userAccount.save()
      return res.status(200).json(userAccount.wishlist)
    }

    userAccount.wishlist.push(wishListItem)
    userAccount.save()
    return res.status(200).json(userAccount.wishlist)

  } catch (error) {
    return res.status(422).json(error)
  }
}

//TODO get method for wishlist
export const getWishlist = async (req, res) => {
  try {
    if (!req.verifiedUser || !req.verifiedUser._id) throw new Error('You\'re not logged in')
    const userAccount = await User.findById(req.verifiedUser._id)
    return res.status(200).json(userAccount.wishlist)
  } catch (error) {
    return res.status(404).json({ message: 'Wishlist not available' })
  }
}


