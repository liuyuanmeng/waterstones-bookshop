import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { userIsAuthenticated } from '../helpers/auth'
import logo from './../images/home.png'

const PageNavbar = () => {

  const [ term, setTerm ] = useState('')
  const [errors, setErrors] = useState(false)
  
  const navigate = useNavigate()
  // console.log(userIsAuthenticated())

  const handleLogout = () => {

    window.localStorage.removeItem('project-3-waterstones')

    navigate('/login')
  }

  const handleChange = (e) => {
    setTerm(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      navigate(`/books/search/${term}`)
    } catch (error) {
     
      setErrors(error.response.data)
    }
  }


  return (
    <Navbar  expand="lg navbar-dark">

      <Container>

        <Navbar.Brand as={Link} to='/'>
          
          <img src={logo}/>
         
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <form className='form-inline '>
          <input type="text" name="searchTerm" placeholder='🔍Search Book or Author here...' onChange={handleChange} />
          <button type="submit" className="btn btn-outline-dark btn-sm" onClick={handleSubmit}>Search</button>
 
        </form>

        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>

          
          {/* <Nav.Link as={Link} to="/books">Books</Nav.Link> */}
          {userIsAuthenticated() ?
            <>
              <Nav.Link as={Link} to="/account">Account</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              <Nav.Link as={Link} to="/account/wishlist">♥️Wish List</Nav.Link>
              
            </>

            :
            <>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </>
          }

        </Navbar.Collapse>
      </Container>
    </Navbar> 
  )

   
}

export default PageNavbar