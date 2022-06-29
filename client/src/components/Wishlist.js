// packages
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// bootstrap
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { useParams, Link } from 'react-router-dom'

// Authorization
import { userIsAuthenticated, getTokenFromLocalStorage } from '../helpers/auth'


const WishList = () => {
  const [books, setBooks] = useState([])
  const [errors, setErrors] = useState(false)
  const { id } = useParams()

  // account state - purely for the purpose of accesing {account.firstName} to display on page
  const [account, setAccount] = useState('')
  // TODO: wishlist state - array to iterate through and display wishlist items
  const [wishlist, setWishlist] = useState([])

  // this useEffect is purely for the purpose of accesing {account.firstName} to display on page
  useEffect(() => {
    !userIsAuthenticated()
    const getAccount = async () => {
      try {
        const { data } = await axios.get('/api/account', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        setAccount(data)
      } catch (error) {
        console.log(error)
      }
    }
    getAccount()
  }, [])

  // TODO to get single book
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/books/') // * <-- replace with your endpoint
      setBooks(data)
    }
    getData()
  }, [])


  // TODO: useEffect used to fetch wishlist data from back end and set state for 'wishlist'
  useEffect(() => {
    const getWishlist = async () => {
      const { data } = await axios.get('/api/account/wishlist/', {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      setWishlist(data)
    }
    getWishlist()
  }, [])

  // TODO: control flow to display wishlist or be prompted to login
  if (wishlist && wishlist[0]) {
    console.log(wishlist)
    return (
      <Container className='container-styling'>
        <Row className='heading-div'>
          <h2 className='heading'>My wish list</h2>
          <p className='heading-paragraph'>A wishlist by {account.firstName} <br></br> Would you like to <a href="http://localhost:3001/">Add more items?</a></p>
        </Row>
        <hr className='hr-line-first' />
        <div>
          {wishlist.map((book, index) => {
            const { _id, title, image, author, description, genre, price, subGenre, yearPublished } = book
            return (
              <>
                <Row className='row-styling'>
                  <Col sm='3' md='3' lg='2' className='column-one'>
                    <div key={_id}>
                      {/* <Link to={`/books/${id}`} key={id}> */}
                      <Link to={`/books/${_id}`}>
                        <img className='book-image' src={image} alt={title} />
                      </Link>
                    </div>
                  </Col>
                  <Col sm='9' md='9' lg='10' className='column-two'>
                    <div key={_id}>
                      {/* <Link className='text-decoration-none' to={`/books/${_id}`} key={_id}> */}
                      <Link to={`/books/${_id}`}>
                        <div>
                          <p className='title-whish'>{title}</p>
                        </div>
                      </Link>
                    </div>
                    <div className='col-two-items author-whishlist'>
                      <p>{author}</p>
                    </div>
                    <div className='col-two-items'>
                      <p className='price'>￡<span className='price-number'>{price}</span></p>
                    </div>
                    <div className='col-two-items sub-genre'>
                      <p>{subGenre}</p>
                    </div>
                    <div className='col-two-items description'>
                      <p>{description}</p>
                    </div>
                  </Col>
                  <hr />
                </Row>
              </>
            )


          })}
        </div>
      </Container>
    )
  } else {
    return (
      <Container className='container-styling'>
        <Row className='heading-div'>
          <h2 className='heading'>My wish list</h2>
          <p className='heading-paragraph'>Hi {account.firstName}, you have no items in your wishlist yet. <br></br> Would you like to <a href="http://localhost:3001/">Add items?</a></p>
        </Row>
      </Container>
    )
  }
}

export default WishList