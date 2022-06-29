# Project 3: Waterstones Bookshop

## Overview

This was the third project for the Software Engineering Immersive course with GA, which consisted of a full-stack group project built using the MERN stack, the whole project was built and delivered in a week.

You can find the deployed version of the project [here](xcdcdvfbgbfgng).

## Technologies Used

 MERN Stack (MongoDB, Express.js, React, Node.js)
* React Router
* JavaScript (ES6+)
* Mongoose
* JSON Web Token / bcrypt
* React-Bootstrap
* HTML5, CSS3, and SASS
* Axios
* VSCode
* Eslint
* Git & GitHub
* Insomnia
* Google doc for Project Management

## Planning:
* Excalidraw
### Features
* Homepage - index of all books
* Navbar - allow users to navigate across between different pages on the site and serching books by name or author
* User Login/Register
* Account - users can find their profile and wishlist
* Book show page - detailed view of book, where you can add book to your wishlist, add review and delete review if you are the owner. Same subgerne added.

## Approach Taken
Planning (day1) On the first day, we decided on the theme for our project and used Exaclidraw and Google Docs to record working progress and tasks. (day 2&3) We created the back end together, and after all the relations tested in insomnia, we decided to work on the front end separately. 

Division of Work:
* Yuanmeng - Bookshow page , Account page, Navbar
* Marko - Wishlist, Login, Register
* Riccardo - Homepage, Post review, delete review

## Wireframing 

## Demonstration of the App Flow 

## Final Product of My part - Screenshot Walkthrough

#### Add serching in Navbar
I have added serching in the Navbar to give users better experience.

``` const handleChange = (e) => {
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
```
```<form className='form-inline '>
          <input type="text" name="searchTerm" placeholder='🔍Search Book or Author here...' onChange={handleChange} />
          <button type="submit" className="btn btn-outline-dark btn-sm" onClick={handleSubmit}>Search</button>
 
        </form>
```
####
####

## Reflection
### challenges 
### Key Learnings
### Future Features





