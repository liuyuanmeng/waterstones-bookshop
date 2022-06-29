import User from '../models/users.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// METHOD: POST
// Endpoint: /register
// descritption: add registered user into mongoDB database.
export const registerUser = async (req, res) => {
  const { body } = req
  console.log(body)
  try {
    console.log('received')
    const newUser = await User.create(body)
    return res.status(200).json({ message: `Welcome to Miami ${newUser.firstName}` })
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
}

// METHOD: POST
// Endpoint: /register
// descritption: add registered user into mongoDB database.
export const loginUser = async (req, res) => {
  const { body } = req
  try {
    console.log('user body ->', body)
    const { email, password } = body
    const userToLogin = await User.findOne({ email: email })
    console.log('user to loin -> ', userToLogin)

    if (!userToLogin || !userToLogin.validatePassword(password)){
      throw new Error()
    }

    const token = jwt.sign({ sub: userToLogin._id }, process.env.SECRET, { expiresIn: '6h' })
    console.log('token -> ', token)

    return res.status(200).json({ message: `Welcome back ${userToLogin.firstName}`, token: token })
  } catch (error) {
    console.log(error)
    return res.status(422).json({ message: 'unauthorised' })
  }
}