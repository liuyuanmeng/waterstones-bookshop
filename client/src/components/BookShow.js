import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ReviewDisplay } from './ReviewDisplay'
import { SimilarBookDisplay } from './SimilarBookDisplay'

// slider
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


// Bootstrap components76t
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Spinner from '../utilities/Spinner'
import { getPayload, userIsAuthenticated, getTokenFromLocalStorage } from '../helpers/auth'

const BookShow = () => {

  const navigate = useNavigate()
  const payload = getPayload()
  const { id } = useParams()
  const [review, setReview] = useState('')
  const [reviews, setReviews] = useState([])
  const [book, setBook] = useState(null)
  const [errors, setErrors] = useState(false)
  //for section display same subgenre books
  const [similarBooks, setSimilarBooks] = useState([])

  // reviewform
  const [formData, setFormData] = useState({
    reviewTitle: '',
    text: '',
  })

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
  }

  // TODO ================================= Start of Wishlist button functionality =================================

  // * 1) state
  const [wishlistItem, setWishlistItem] = useState('🎁')

  // * 2) useEffect for status (has item been added to wishList or not?)
  useEffect(() => {
    const getWishListStatus = async () => {
      const wishlistArray = await axios.get('/api/account/wishlist/', {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      wishlistArray.data.some(item => item.id === id) ? setWishlistItem('🧨 Remove from Wishlist 🧨') : setWishlistItem('🎁 Add to Wishlist 🎁')
    }
    getWishListStatus()
  }, [book])

  // * 3) execution of button functionality - logic in back end request.
  const addOrRemove = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`/api/account/wishlist/${id}`, null, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      navigate('/account/wishlist')
    } catch (error) {
      console.log(error)
    }
  }

  // TODO ================================= end of Wishlist button functionality =================================

  // TODO to get single book
  useEffect(() => {
    const getBook = async () => {
      try {
        const { data } = await axios.get(`/api/books/${id}`)
        setBook(data)
        setFormData(data)
        setReviews(data.reviews)
      } catch (error) {
        setErrors(true)

      }
    }
    getBook()

  }, [id])
  // TODO to get all the books
  useEffect(() => {
    const getSimilarBooks = async () => {
      try {
        const { data } = await axios.get('/api/books')
        setSimilarBooks(data)

      } catch (error) {
        setErrors(true)

      }
    }
    getSimilarBooks()
  }, [id])
  useEffect(() => {
    if (review) {
      // On page load we want to check the user is owner !userIsOwner(review) && 
      navigate(`/api/books/${id}/reviews/`)
    }
  }, [review, navigate])


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }
  //input for  data
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // this function will addreview 

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Add owner and username to comment form data
    // setFormData({ ...formData, owner: payload.sub, username: payload.username })
    setFormData({ ...formData, Reviewowner: payload.sub, firstname: payload.firstname })
    try {
      const { data } = await axios.post(`/api/books/${id}/reviews`, formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      navigate(`/books/${data._id}`)
      console.log('data --->', data)
      setReviews([...reviews, formData])
      setFormData({
        reviewTitle: '',
        text: '',
      })
    } catch (error) {
      console.log(error)
      console.log(error.response.data)
      setErrors(error.response.data)
    }
    
  }

  const handleDeleteBtn = async (e, review) => {
    const reviewId = review._id

    try {
      await axios.delete(`/api/books/${id}/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
    } catch (error) {
      console.log(error)

    }
    setReviews(reviews.filter(item => item._id !== reviewId))
  }



  return (
    <Container className="bookshow">
      <Row>
        {book ?
          <>

            <Col xs="12">
              <h3>{book.title}</h3>
              <hr />
            </Col>
            <Col md="6">
              <img src={book.image} alt={book.name} />
              <button className="wishlist-button" onClick={addOrRemove}>{wishlistItem}</button>
            </Col>

            <Col md="6">

              <h4>Author</h4>
              <p>{book.author}</p>
              <hr />

              <h4>Price</h4>
              <p>£{book.price}</p>
              <hr />
              <h4>Year Published</h4>
              <p>{book.yearPublished}</p>
              <hr />
              <h4>Description</h4>
              <p>{book.description}</p>
              <hr />
              <h4>Authors</h4>
              <p>{book.authors}</p>
              <hr />
            </Col>

            <h4 className='you-may-also'>You may also be interested in...</h4>

            <Slider {...settings} className='carousel-wrapper'>
              {similarBooks.filter(item => item.subGenre === book.subGenre && item.id !== book.id).map((item, index) => {
                return <SimilarBookDisplay key={item.id} item={item} />
              })}
            </Slider>


            {userIsAuthenticated() ?
              <form className='review-form' onSubmit={handleSubmit}>
                <h4 className='text'>Write your review</h4>

                <label htmlFor="reviewTitle">Title</label>

                <textarea type="text" name="title" className="input" rows="2" placeholder='Add a title for your review here' value={formData.reviewTitle} onChange={handleChange}></textarea>

                {errors.reviewTitle && <p className='text-danger'>{errors.reviewTitle}</p>}

                <label htmlFor="reviewText">Text</label>

                <textarea type="text" name="text" className="input" rows="4" placeholder='write your review here' value={formData.text} onChange={handleChange}></textarea>


                {errors.reviewText && <p className='text-danger'>{errors.reviewText}</p>}

                {/* Submit */}
                <button type="submit" className="button small">POST REVIEW</button>
              </form>
              :
              (
                <div className="not-registered-container">
                  <h4>Reviews</h4>
                  <div>
                    <p>🖋<Link to="/login">Sign in </Link>to write a review</p>
                    <p>Not Registered Yet? <Link to="/register">Register</Link> instead</p>
                  </div>
                  {errors.text && (
                    <p>{errors.text}</p>
                  )}
                </div>
              )}

            {!reviews.length < 1
              ?
              <h4 className='reviews-header'>Reviews:</h4>
              :
              <h4 className='reviews-header'>No reviews yet!</h4>
            }
            <div className='reviews-display-box'>
              {
                reviews.map((review) => {
                  return <ReviewDisplay key={review.id} review={review} handleDeleteBtn={handleDeleteBtn} />
                })
              }
            </div>

          </>
          :
          <h2 className='text-center'>
            {/* {errors ? 'Something went wrong! Please try again later!' : <Spinner />} */}
          </h2>
        }

      </Row>

    </Container>
  )






}
export default BookShow

