# Project 3: Waterstones Bookshop

## Overview

This was the third project for the Software Engineering Immersive course with GA, which consisted of a full-stack group project built using the MERN stack, the whole project was built and delivered in a week.

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
<img src="https://user-images.githubusercontent.com/100864042/176675502-1a413930-f225-4dfd-a8b1-32266bc7be42.png" width="600">

<img width="600" src="https://user-images.githubusercontent.com/100864042/176675798-ad894a94-11b7-4fd9-9c3d-7fc229189c0d.png">




## Demonstration of the App Flow 


https://user-images.githubusercontent.com/100864042/176675900-5f422834-58dd-49dd-8aa5-4109f0795e78.mov


## Final Product of My part - Screenshot & Featured COde Walkthrough
<img width="600" alt="Screenshot 2022-06-29 at 15 45 54" src="https://user-images.githubusercontent.com/100864042/176676047-057e38ed-92fc-4748-bfed-ebce1ed925f7.png">


<img width="600" alt="Screenshot 2022-06-29 at 15 46 36" src="https://user-images.githubusercontent.com/100864042/176676120-886c6369-ee49-4e21-be85-76bd0e340c92.png">



#### Added serching in Navbar

I have added serching in the Navbar to give users better experience.
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

#### Added books that shared  the same subGenre 

<img width="600" alt="Screenshot 2022-06-29 at 15 46 08" src="https://user-images.githubusercontent.com/100864042/176676085-19a43954-297b-41b2-a5a4-c4cbe9df621a.png">

```  <Slider {...settings} className='carousel-wrapper'>
              {similarBooks.filter(item => item.subGenre === book.subGenre && item.id !== book.id).map((item, index) => {
                return <SimilarBookDisplay key={item.id} item={item} />
              })}
            </Slider>
 ```

#### Account Page

<img width="600" alt="Screenshot 2022-06-29 at 15 46 23" src="https://user-images.githubusercontent.com/100864042/176676107-7839a958-0122-4415-b409-a47299ed6982.png">

#### Profile Page

<img width="600" alt="Screenshot 2022-06-29 at 15 46 36" src="https://user-images.githubusercontent.com/100864042/176676120-886c6369-ee49-4e21-be85-76bd0e340c92.png">





## Reflection
### challenges 
### Key Learnings
### Future Features





