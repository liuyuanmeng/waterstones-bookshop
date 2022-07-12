# Project 3: Firestone Bookshop

## Brief

* Build a full-stack MERN (MongoDB, Express.js, React, Node.js) application by making your own Back-End and Front-End
* Use MongoDB as database for your API using Node.js for building the Back-End

* Consume your API with a separate front-end built with React

* Be a complete product which most likely means multiple relationships and CRUD functionality

* implement thoughtful use stories/wireframes that are significant enough to help you know which features are core and which you can cut out
* Be deployed online


## Overview

This project was the third for the Software Engineering Immersive course with GA, which consisted of a full-stack group project built using the MERN stack; the whole project was built in a team of 3 students and delivered in a week. The idea was to have a database of books and an app which mirrors the Waterstones website, which we used as a guide for this project.

You can find the deployed version of the project [here](https://firestonebookshop.herokuapp.com/).

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
* Navbar - allow users to navigate between different pages on the site and search books by name or author
* User Login/Register Page
* Account Page - users can find their profile and wishlist
* Book show page - detailed view of the book, where you can add the book to your wishlist, add reviews and delete reviews if you are the owner. A section showing others books that can be of interest was added based on the book’s subgenre.
* Wishlist Page
All content was sourced from the [Waterstones](https://www.waterstones.com/) website

## Approach Taken
Planning (day1) On the first day, we decided on the theme for our project and used Excalidraw and Google Docs to record working progress and tasks. (day 2&3) We created the back end together, and after all the relations were tested in insomnia, we decided to work on the front end separately. 

Division of Work:
* Yuanmeng - Book show page, Account page, Navbar
* Marko - Wishlist, Login, Register
* Riccardo - Homepage, Post review, Delete review

## Wireframing

Back-End design
The Back-End consisted of a database which held our API; a router (and secure route) through which all requests were made; controllers which would access the model before returning the request to the User.
<img src="https://user-images.githubusercontent.com/100864042/176675502-1a413930-f225-4dfd-a8b1-32266bc7be42.png" width="600">
Front-End design
We wanted to keep the Front-End design relatively simple and add on features if we had time in the end. As seen in the wireframe, there are three main pages: the home page, the book show page, and the wishlist page. We didn't add the Register/Login pages to the wireframe as they were a given.

<img width="600" src="https://user-images.githubusercontent.com/100864042/176675798-ad894a94-11b7-4fd9-9c3d-7fc229189c0d.png">


## Demonstration of the App Flow 

https://user-images.githubusercontent.com/100864042/176675900-5f422834-58dd-49dd-8aa5-4109f0795e78.mov


## Final Product of my part - Screenshot & Featured Code Walkthrough
#### Bookshow page
<img width="600" alt="Screenshot 2022-06-29 at 15 45 54" src="https://user-images.githubusercontent.com/100864042/176676047-057e38ed-92fc-4748-bfed-ebce1ed925f7.png">

#### Added search bar in Navbar

I added a search bar in the Navbar to give users a better experience.
<img width="600" alt="Screenshot 2022-06-29 at 15 45 45" src="https://user-images.githubusercontent.com/100864042/176676206-fae167a2-3c71-4930-9e23-312825442c34.png">

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

#### Added books that shared the same subGenre 
Used the filter to select books from the same subgenre.

<img width="600" alt="Screenshot 2022-06-29 at 15 46 08" src="https://user-images.githubusercontent.com/100864042/176676085-19a43954-297b-41b2-a5a4-c4cbe9df621a.png">

```  <Slider {...settings} className='carousel-wrapper'>
              {similarBooks.filter(item => item.subGenre === book.subGenre && item.id !== book.id).map((item, index) => {
                return <SimilarBookDisplay key={item.id} item={item} />
              })}
            </Slider>
 ```

#### Account Page
Only the first name of users show up on the page, and users can use two links to navigate to their profile and wishlist.
``` <h5>Hi {account.firstName}, welcome to your account dashboard</h5>```
``` <a href="/account/profile/" className="btn">👤Your Profile</a>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <a href="/account/wishlist/" className="btn">❤️Wish Lists</a>
  ```
                


<img width="600" alt="Screenshot 2022-06-29 at 15 46 23" src="https://user-images.githubusercontent.com/100864042/176676107-7839a958-0122-4415-b409-a47299ed6982.png">

#### Profile Page

<img width="600" alt="Screenshot 2022-06-29 at 15 46 36" src="https://user-images.githubusercontent.com/100864042/176676120-886c6369-ee49-4e21-be85-76bd0e340c92.png">





## Reflection
## Wins
* The site's styling is similar to the Waterstones website, which we modelled. 
* Having a fully-function Full-Stack Mern app.




### Key Learnings
* Using  MERN
* Designing relationships on the Back-end and control flow on the Front-end
* Working in a group 
* Prioritising tasks
* Time management 

### Challenges
* Merge conflicts- This was each of our first team projects using Github branches, so when we worked on the same code block, caused merge conflicts, this could have been avoided with more effective communication.


### Bugs
* When deleting a review, all reviews for that book are simultaneously deleted.
* The same Book can be added to wishlists multiple times 


### Future Improvements
* Responsive styling
* Review display render
* No duplicate books added to the wishlists







